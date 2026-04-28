const User = require('../models/User');

async function createSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (!email || !password) return;
  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({ email, password, name: 'Super Admin', role: 'admin' });
    console.log('Super admin created');
  }
}

module.exports = { createSuperAdmin };
