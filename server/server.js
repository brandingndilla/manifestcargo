const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('./models/User');
const Manifest = require('./models/Manifest');
const Shipment = require('./models/Shipment');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const { sendPasswordResetEmail } = require('./services/emailService');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('🚀 Starting server...');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

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
      status: 'pending'
    });
    await user.save();

    console.log('📝 User registered, pending approval:', user.email);

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

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('🔑 Forgot password request:', email);

    const user = await User.findOne({ email });

    // Always respond the same way, whether or not the email exists
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    console.log('📧 Reset email sent to:', user.email);
    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    res.status(500).json({ error: 'Server error' });
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

    user.password = password; // pre-save hook in models/User.js hashes it
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
// ADMIN ROUTES (protected + admin only)
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

// ============================================
// MANIFEST ROUTES (protected + scoped to req.userId)
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
// SHIPMENT ROUTES (protected + scoped to req.userId)
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
// TEST ROUTES
// ============================================
app.get('/', (req, res) => {
  res.json({ message: '🚀 Cargo Manifest API is running!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ error: 'Route not found: ' + req.url });
});

app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log('='.repeat(50));
  console.log('🚀 Server running on port ' + PORT);
  console.log('='.repeat(50));

  const userCount = await User.countDocuments();
  console.log('📝 Users:', userCount);
  console.log('📦 Manifests:', await Manifest.countDocuments());
  console.log('📦 Shipments:', await Shipment.countDocuments());
});