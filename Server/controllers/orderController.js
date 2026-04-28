const Order = require('../models/Order');
const Plan = require('../models/Plan');
const generateInvoice = require('../utils/generateInvoice');

exports.createOrder = async (req, res) => {
  const { planId } = req.body;
  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  const amount = plan.discountPrice || plan.price;
  const orderId = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
  const order = await Order.create({
    orderId,
    userId: req.user.id,
    planId,
    amount,
    paymentStatus: 'pending',
    serviceStatus: 'pending'
  });
  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate('planId');
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('userId planId');
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { paymentStatus, serviceStatus } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { paymentStatus, serviceStatus }, { new: true });
  res.json(order);
};

exports.downloadInvoice = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('userId planId');
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const pdfBuffer = await generateInvoice(order);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice_${order.orderId}.pdf`);
  res.send(pdfBuffer);
};