const User = require('../models/User');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const paidOrders = await Order.countDocuments({ paymentStatus: 'paid' });
  const revenue = await Order.aggregate([{ $match: { paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
  res.json({ totalUsers, totalOrders, paidOrders, totalRevenue: revenue[0]?.total || 0 });
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(id, { name, email, role }, { new: true }).select('-password');
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

exports.createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await User.create({ email, password, name, role });
  res.status(201).json(user);
};