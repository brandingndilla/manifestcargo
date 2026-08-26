require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');    // ✅ correct

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'admin@gmail.com';        // ← change this
  const password = 'manifest.AI147'; // ← change this

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'admin';
    existing.status = 'approved';
    await existing.save();
    console.log('✅ Existing user promoted to admin:', email);
  } else {
    const admin = new User({
      name: 'Admin', email, password,
      company: 'Manifest Cargo', companyPhone: '000000000',
      role: 'admin', status: 'approved'
    });
    await admin.save();
    console.log('✅ Admin created:', email);
  }
  process.exit(0);
}

seedAdmin();