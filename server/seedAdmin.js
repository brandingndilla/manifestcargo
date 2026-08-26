require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');    // ✅ correct path

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'admin@gmail.com';        // ← change if needed
  const password = 'manifest.AI147';      // ← new password

  const existing = await User.findOne({ email });
  if (existing) {
    // Update role, status, AND password
    existing.role = 'admin';
    existing.status = 'approved';
    existing.password = password;          // ← This line is new – will trigger hash
    await existing.save();
    console.log('✅ Existing user promoted to admin with updated password');
  } else {
    const admin = new User({
      name: 'Admin',
      email,
      password,                            // will be hashed by pre('save')
      company: 'Manifest Cargo',
      companyPhone: '000000000',
      role: 'admin',
      status: 'approved'
    });
    await admin.save();
    console.log('✅ Admin created:', email);
  }
  process.exit(0);
}

seedAdmin();