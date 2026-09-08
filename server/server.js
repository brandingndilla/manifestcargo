const dotenv = require('dotenv');
dotenv.config(); // must run BEFORE any local module (like smsService.js) reads process.env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios'); // needed for the /api/sms/test-free route below

const User = require('./models/User');
const Manifest = require('./models/Manifest');
const Shipment = require('./models/Shipment');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const { sendPasswordResetEmail } = require('./services/emailService');
const { 
  sendSMS, 
  sendBulkSMS, 
  scheduleSMS,
  getSMSBalance,
  getDeliveryReports,
  getDeliveryReportByMessageId,
  sendTestSMS,
  sendShipmentStatusNotification
} = require('./services/smsService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('🚀 Starting server...');

// ============================================
// DATABASE CONNECTION
// ============================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ============================================
// HELPER FUNCTIONS
// ============================================
async function getManifestTotals(manifestId) {
  const manifestShipments = await Shipment.find({ manifestId });

  const totalItems = manifestShipments.reduce((sum, s) =>
    sum + s.items.reduce((a, i) => a + i.qty, 0), 0);
  const totalAmount = manifestShipments.reduce((sum, s) => sum + s.total, 0);
  const totalCollected = manifestShipments
    .filter(s => s.payment === 'paid')
    .reduce((sum, s) => sum + s.total, 0);
  const totalOutstanding = totalAmount - totalCollected;

  return {
    totalItems,
    totalShipments: manifestShipments.length,
    totalAmount,
    totalCollected,
    totalOutstanding
  };
}

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Turns a business name into a valid NextSMS/GSM alphanumeric sender ID candidate:
// letters, numbers, and spaces only, max 11 characters (the GSM alphanumeric sender ID limit).
// This is just a candidate — it still needs to be registered and approved in the NextSMS
// dashboard before it can actually be used to send SMS (see User.senderIdStatus).
function generateSenderIdCandidate(businessName) {
  return businessName
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .slice(0, 11);
}

// ============================================
// AUTH ROUTES
// ============================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, company, companyPhone } = req.body;
    console.log('📝 Register attempt:', { name, email, company, companyPhone });

    if (!name || !email || !password || !company || !companyPhone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      company,
      companyPhone,
      role: 'user',
      status: 'pending',
      senderName: generateSenderIdCandidate(company),
      senderIdStatus: 'pending'
    });
    await user.save();

    console.log('📝 User registered, pending approval:', user.email);
    console.log('📛 Sender ID candidate generated:', user.senderName, '(needs NextSMS approval before use)');

    res.status(201).json({
      message: 'Registration successful! Your account is pending admin approval. You will be able to log in once approved.'
    });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (user.status === 'pending') {
      return res.status(403).json({ error: 'Your account is pending approval. Please wait for the admin to grant access.' });
    }

    if (user.status === 'rejected') {
      return res.status(403).json({ error: 'Your access request was rejected. Contact the admin for more information.' });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        companyPhone: user.companyPhone,
        role: user.role
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    console.log('🔑 Get user info');
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('❌ Get user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const { companyPhone } = req.body;
    console.log('📝 Updating profile for user:', req.userId);

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (companyPhone !== undefined) user.companyPhone = companyPhone;
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        companyPhone: user.companyPhone
      }
    });
  } catch (err) {
    console.error('❌ Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// FORGOT PASSWORD ROUTE
// ============================================
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('🔑 Forgot password request for:', email);

    if (!email) {
      return res.status(400).json({ 
        success: false,
        error: 'Email is required' 
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log('⚠️ Password reset requested for non-existent email:', email);
      return res.status(200).json({ 
        success: true,
        message: 'If that email exists, a reset link has been sent.' 
      });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    console.log('✅ Reset token generated for:', user.email);

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
    console.log('🔗 Reset URL:', resetUrl);

    try {
      await sendPasswordResetEmail(user.email, resetUrl);
      console.log('📧 Reset email sent successfully to:', user.email);
    } catch (emailError) {
      console.error('❌ Failed to send reset email:', emailError.message);
      return res.status(200).json({ 
        success: true,
        message: 'If that email exists, a reset link has been sent.' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'If that email exists, a reset link has been sent.' 
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error. Please try again later.' 
    });
  }
});

app.post('/api/auth/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset link' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log('✅ Password reset for:', user.email);
    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    console.error('❌ Reset password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// ADMIN ROUTES
// ============================================

app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    console.log('👥 Admin fetched all users - Total:', users.length);
    res.json(users);
  } catch (err) {
    console.error('❌ Get users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/users/pending', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' }).select('-password').sort({ createdAt: -1 });
    console.log('⏳ Pending users:', pendingUsers.length);
    res.json(pendingUsers);
  } catch (err) {
    console.error('❌ Get pending users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/users/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('✅ User approved:', user.email);
    res.json({ success: true, message: `${user.name} approved successfully`, user });
  } catch (err) {
    console.error('❌ Approve user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/users/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('🚫 User rejected:', user.email);
    res.json({ success: true, message: `${user.name} rejected`, user });
  } catch (err) {
    console.error('❌ Reject user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('🗑️ User deleted:', user.email);
    res.json({ success: true, message: `${user.name} deleted` });
  } catch (err) {
    console.error('❌ Delete user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve a company's SMS sender ID — once approved, their SMS will show this
// as the "from" name instead of the platform default. Do this only after the
// senderName has actually been registered and approved in the NextSMS dashboard.
app.put('/api/admin/users/:id/sender-id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { senderIdStatus: 'approved' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`✅ Sender ID approved for ${user.email}: "${user.senderName}"`);
    res.json({ success: true, message: `Sender ID "${user.senderName}" approved for ${user.company}`, user });
  } catch (err) {
    console.error('❌ Approve sender ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject a company's SMS sender ID candidate — they stay on the platform default
// until a new candidate is set (e.g. via /api/admin/users/:id/sender-id, below)
// and approved.
app.put('/api/admin/users/:id/sender-id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { senderIdStatus: 'rejected' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`🚫 Sender ID rejected for ${user.email}: "${user.senderName}"`);
    res.json({ success: true, message: `Sender ID "${user.senderName}" rejected for ${user.company}`, user });
  } catch (err) {
    console.error('❌ Reject sender ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Manually edit a company's sender name candidate — useful when the auto-generated
// one is a poor fit (truncated awkwardly, or collides with another company's name)
// and needs a human to pick something better before submitting it to NextSMS.
app.put('/api/admin/users/:id/sender-id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { senderName } = req.body;

    if (!senderName || senderName.trim().length === 0) {
      return res.status(400).json({ error: 'senderName is required' });
    }

    const sanitized = senderName.replace(/[^a-zA-Z0-9 ]/g, '').trim().slice(0, 11);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { senderName: sanitized, senderIdStatus: 'pending' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`📝 Sender ID candidate updated for ${user.email}: "${sanitized}"`);
    res.json({ success: true, message: `Sender ID candidate set to "${sanitized}"`, user });
  } catch (err) {
    console.error('❌ Update sender ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// MANIFEST ROUTES
// ============================================

app.get('/api/manifests', authMiddleware, async (req, res) => {
  try {
    const manifests = await Manifest.find({ createdBy: req.userId }).sort({ createdAt: -1 });
    console.log('📋 Get all manifests - Total:', manifests.length);

    const allManifests = await Promise.all(manifests.map(async (m) => {
      const manifestShipments = await Shipment.find({ manifestId: m._id.toString(), createdBy: req.userId });
      return {
        ...m.toObject(),
        shipments: manifestShipments,
        totals: await getManifestTotals(m._id.toString())
      };
    }));

    res.json(allManifests);
  } catch (err) {
    console.error('❌ Get manifests error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/manifests/:id', authMiddleware, async (req, res) => {
  try {
    console.log('📋 Get manifest by ID:', req.params.id);

    const manifest = await Manifest.findOne({ _id: req.params.id, createdBy: req.userId });
    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    const manifestShipments = await Shipment.find({ manifestId: manifest._id.toString(), createdBy: req.userId });

    res.json({
      ...manifest.toObject(),
      shipments: manifestShipments,
      totals: await getManifestTotals(manifest._id.toString())
    });
  } catch (err) {
    console.error('❌ Get manifest error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/manifests', authMiddleware, async (req, res) => {
  try {
    const { truckPlate, driverName, supervisor, manifestDate, status } = req.body;

    const manifest = new Manifest({
      truckPlate: truckPlate || '',
      driverName: driverName || '',
      supervisor: supervisor || '',
      manifestDate: manifestDate || new Date(),
      status: status || 'DRAFT',
      createdBy: req.userId
    });

    await manifest.save();
    console.log('✅ Manifest created:', manifest._id);

    res.status(201).json(manifest);
  } catch (err) {
    console.error('❌ Create manifest error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/manifests/:id', authMiddleware, async (req, res) => {
  try {
    console.log('📝 Updating manifest:', req.params.id);

    const manifest = await Manifest.findOne({ _id: req.params.id, createdBy: req.userId });
    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    const { truckPlate, driverName, supervisor, manifestDate, status } = req.body;

    if (truckPlate !== undefined) manifest.truckPlate = truckPlate;
    if (driverName !== undefined) manifest.driverName = driverName;
    if (supervisor !== undefined) manifest.supervisor = supervisor;
    if (manifestDate !== undefined) manifest.manifestDate = manifestDate;
    if (status !== undefined) manifest.status = status;

    await manifest.save();

    res.json({
      success: true,
      message: '✅ Manifest updated successfully!',
      manifest
    });
  } catch (err) {
    console.error('❌ Update manifest error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/manifests/:id', authMiddleware, async (req, res) => {
  try {
    console.log('🗑️ Delete manifest:', req.params.id);

    const manifest = await Manifest.findOne({ _id: req.params.id, createdBy: req.userId });
    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    await Shipment.deleteMany({ manifestId: manifest._id.toString(), createdBy: req.userId });
    await Manifest.deleteOne({ _id: manifest._id });

    res.json({ success: true, message: '✅ Manifest deleted successfully!' });
  } catch (err) {
    console.error('❌ Delete manifest error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// SHIPMENT ROUTES
// ============================================

app.get('/api/shipments', authMiddleware, async (req, res) => {
  try {
    const shipments = await Shipment.find({ createdBy: req.userId });
    console.log('📋 Get all shipments - Total:', shipments.length);
    res.json(shipments);
  } catch (err) {
    console.error('❌ Get shipments error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/shipments', authMiddleware, async (req, res) => {
  try {
    console.log('📦 Creating shipment...');

    const { sender, customer, phone, destination, items, payment, status, manifestId } = req.body;

    if (!sender || !customer || !destination || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let manifest = await Manifest.findOne({ _id: manifestId, createdBy: req.userId });
    if (!manifest) {
      console.log('📝 Manifest not found, creating new one...');
      manifest = new Manifest({ status: 'DRAFT', createdBy: req.userId });
      await manifest.save();
    }

    const shipment = new Shipment({
      sender,
      customer,
      phone: phone || '',
      destination,
      items: items.map(item => ({
        name: item.name,
        qty: item.qty,
        rate: item.rate,
        total: item.qty * item.rate
      })),
      payment: payment || 'unpaid',
      status: status || 'not-loaded',
      manifestId: manifest._id.toString(),
      saved: false,
      createdBy: req.userId
    });

    await shipment.save();
    console.log('✅ Shipment created:', shipment._id);

    res.status(201).json(shipment);
  } catch (err) {
    console.error('❌ Shipment error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/shipments/:id', authMiddleware, async (req, res) => {
  try {
    console.log('📝 Updating shipment:', req.params.id);

    const shipment = await Shipment.findOne({ _id: req.params.id, createdBy: req.userId });
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    const { sender, customer, phone, destination, items, payment, status, total, manifestId, saved } = req.body;

    if (sender !== undefined) shipment.sender = sender;
    if (customer !== undefined) shipment.customer = customer;
    if (phone !== undefined) shipment.phone = phone;
    if (destination !== undefined) shipment.destination = destination;
    if (items !== undefined) {
      shipment.items = items.map(item => ({
        name: item.name,
        qty: item.qty,
        rate: item.rate,
        total: item.qty * item.rate
      }));
      shipment.total = shipment.items.reduce((sum, item) => sum + item.total, 0);
    }
    if (payment !== undefined) shipment.payment = payment;
    if (status !== undefined) shipment.status = status;
    if (total !== undefined) shipment.total = total;
    if (saved !== undefined) shipment.saved = saved;
    if (manifestId !== undefined) shipment.manifestId = manifestId;

    await shipment.save();

    console.log('✅ Shipment updated:', shipment._id);
    res.json({ success: true, message: '✅ Shipment updated!', shipment });
  } catch (err) {
    console.error('❌ Update shipment error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/shipments/:id', authMiddleware, async (req, res) => {
  try {
    console.log('🗑️ Delete shipment:', req.params.id);

    const result = await Shipment.deleteOne({ _id: req.params.id, createdBy: req.userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json({ success: true, message: '✅ Shipment deleted successfully!' });
  } catch (err) {
    console.error('❌ Delete shipment error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================
// SMS ROUTES - Messaging Service API V2
// ============================================

// Send single SMS (Authenticated) — falls back to test mode if no real token is set
app.post('/api/sms/send', authMiddleware, async (req, res) => {
  try {
    const { phone, message, scheduleDate, scheduleTime, reference } = req.body;

    console.log('📨 SMS Request:', { 
      phone, 
      messageLength: message?.length || 0,
      scheduled: !!(scheduleDate && scheduleTime)
    });

    if (!phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number is required' 
      });
    }

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Just check that a token is present — do NOT compare against a specific
    // hardcoded value, since your real token can legitimately equal any string.
    const hasToken = !!process.env.MESSAGING_API_TOKEN;

    if (!hasToken) {
      console.warn('⚠️ No API token configured. Using TEST MODE.');

      const testResult = await sendTestSMS(phone, message);

      return res.status(200).json({
        success: true,
        message: '✅ Test SMS sent (No real SMS was sent)',
        isTest: true,
        data: testResult.data,
        note: 'Add MESSAGING_API_TOKEN to .env to send real SMS'
      });
    }

    // Real SMS sending with a configured token
    // Use this company's own registered sender ID if it's been approved on NextSMS;
    // otherwise fall back to the platform default (from .env / MESSAGING_SENDER_ID)
    // so sending is never blocked just because a company's sender ID is still pending.
    const currentUser = await User.findById(req.userId).select('senderName senderIdStatus');
    const options = {};
    if (currentUser?.senderIdStatus === 'approved' && currentUser.senderName) {
      options.sender = currentUser.senderName;
    }
    if (reference) options.reference = reference;

    let result;
    if (scheduleDate && scheduleTime) {
      result = await scheduleSMS(phone, message, scheduleDate, scheduleTime, options);
    } else {
      result = await sendSMS(phone, message, options);
    }

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.scheduledDate ? 'SMS scheduled successfully' : 'SMS sent successfully',
        messageId: result.messageId,
        status: result.status,
        smsCount: result.smsCount,
        price: result.price,
        phone: result.phone,
        ...(result.scheduledDate && { scheduledDate: result.scheduledDate })
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send SMS',
        details: result.details
      });
    }
  } catch (error) {
    console.error('❌ SMS API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error while sending SMS'
    });
  }
});

// Send bulk SMS (Authenticated)
app.post('/api/sms/bulk', authMiddleware, async (req, res) => {
  try {
    const { recipients, scheduleDate, scheduleTime } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Recipients array is required'
      });
    }

    if (recipients.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 100 recipients per bulk send'
      });
    }

    console.log(`📨 Bulk SMS request for ${recipients.length} recipients`);

    const options = {};
    if (scheduleDate && scheduleTime) {
      options.date = scheduleDate;
      options.time = scheduleTime;
    }

    const result = await sendBulkSMS(recipients, options);
    
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('❌ Bulk SMS API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error while sending bulk SMS'
    });
  }
});

// Schedule SMS (Authenticated)
app.post('/api/sms/schedule', authMiddleware, async (req, res) => {
  try {
    const { phone, message, date, time, reference } = req.body;
    
    if (!phone || !message || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Phone, message, date, and time are required'
      });
    }

    const result = await scheduleSMS(phone, message, date, time, { reference });
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'SMS scheduled successfully',
        messageId: result.messageId,
        scheduledDate: `${date} ${time}`,
        status: result.status
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to schedule SMS'
      });
    }
  } catch (error) {
    console.error('❌ Schedule SMS error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Send shipment status notification (Authenticated)
app.post('/api/sms/shipment-notification', authMiddleware, async (req, res) => {
  try {
    const { phone, customerName, shipmentId, status } = req.body;
    
    if (!phone || !customerName || !shipmentId || !status) {
      return res.status(400).json({
        success: false,
        error: 'Phone, customerName, shipmentId, and status are required'
      });
    }

    const result = await sendShipmentStatusNotification(
      phone, 
      customerName, 
      shipmentId, 
      status
    );
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Shipment notification sent successfully',
        messageId: result.messageId,
        data: result.data
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send shipment notification'
      });
    }
  } catch (error) {
    console.error('❌ Shipment notification error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get SMS balance (Authenticated)
app.get('/api/sms/balance', authMiddleware, async (req, res) => {
  try {
    const result = await getSMSBalance();
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        balance: result.balance
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to check SMS balance'
      });
    }
  } catch (error) {
    console.error('❌ SMS balance error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get delivery reports (Authenticated)
app.get('/api/sms/reports', authMiddleware, async (req, res) => {
  try {
    const { size, messageId, sender, channel, sentSince, sentUntil, reference } = req.query;
    
    const params = {};
    if (size) params.size = parseInt(size);
    if (messageId) params.messageId = messageId;
    if (sender) params.sender = sender;
    if (channel) params.channel = channel;
    if (sentSince) params.sentSince = sentSince;
    if (sentUntil) params.sentUntil = sentUntil;
    if (reference) params.reference = reference;

    const result = await getDeliveryReports(params);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        reports: result.reports,
        count: result.count,
        total: result.total
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to get delivery reports'
      });
    }
  } catch (error) {
    console.error('❌ Delivery reports error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Get delivery report by message ID (Authenticated)
app.get('/api/sms/reports/:messageId', authMiddleware, async (req, res) => {
  try {
    const { messageId } = req.params;
    
    if (!messageId) {
      return res.status(400).json({
        success: false,
        error: 'Message ID is required'
      });
    }

    const result = await getDeliveryReportByMessageId(messageId);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        report: result.report
      });
    } else {
      return res.status(404).json({
        success: false,
        error: result.error || 'Delivery report not found'
      });
    }
  } catch (error) {
    console.error('❌ Delivery report error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// Test SMS endpoint (No auth required - for testing)
app.post('/api/sms/test', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone and message are required' 
      });
    }
    
    console.log('🧪 Test SMS to:', phone);
    const result = await sendTestSMS(phone, message);
    
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Debug endpoint — check what SMS env vars the server actually sees (Authenticated)
app.get('/api/sms/debug', authMiddleware, async (req, res) => {
  try {
    const config = {
      token: process.env.MESSAGING_API_TOKEN ? '✅ Set' : '❌ Missing',
      tokenValue: process.env.MESSAGING_API_TOKEN ? process.env.MESSAGING_API_TOKEN.substring(0, 10) + '...' : 'N/A',
      baseUrl: process.env.MESSAGING_BASE_URL || 'Not set',
      senderId: process.env.MESSAGING_SENDER_ID || '(not set, code will default to POS)'
    };

    console.log('🔍 SMS Debug Config:', config);

    res.json({
      success: true,
      config: config
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unauthenticated free test send, hitting NextSMS's mobile test endpoint directly
app.post('/api/sms/test-free', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone and message are required' 
      });
    }

    // Format phone number
    let formattedPhone = phone.replace(/\s/g, '').replace(/^\+/, '');
    if (!formattedPhone.startsWith('255')) {
      formattedPhone = formattedPhone.replace(/^0/, '255');
    }

    console.log('🧪 Sending test SMS (no auth) to:', formattedPhone);

    // Use the test endpoint (no authentication required)
    const response = await axios.post(
      `https://messaging-service.co.tz/api/mobile/v2/test/text/single`,
      {
        to: formattedPhone,
        text: message
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('✅ Test SMS sent successfully');
    return res.json({
      success: true,
      data: response.data,
      phone: formattedPhone,
      isTest: true,
      note: 'This is a test SMS. No actual SMS was sent.'
    });

  } catch (error) {
    console.error('❌ Test SMS failed:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ============================================
// TEST ROUTES
// ============================================
app.get('/', (req, res) => {
  res.json({ message: '🚀 Cargo Manifest API is running!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ error: 'Route not found: ' + req.url });
});

app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, '0.0.0.0', async () => {
  console.log('='.repeat(50));
  console.log('🚀 Server running on port ' + PORT);
  console.log('='.repeat(50));

  try {
    const userCount = await User.countDocuments();
    console.log('📝 Users:', userCount);
    console.log('📦 Manifests:', await Manifest.countDocuments());
    console.log('📦 Shipments:', await Shipment.countDocuments());
  } catch (err) {
    console.log('⚠️ Database stats not available yet');
  }
});