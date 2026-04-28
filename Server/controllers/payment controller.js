const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

exports.createRazorpayOrder = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findOne({ orderId });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const options = {
    amount: order.amount * 100,
    currency: 'INR',
    receipt: orderId,
    payment_capture: 1
  };
  const rzpOrder = await razorpay.orders.create(options);
  order.razorpayOrderId = rzpOrder.id;
  await order.save();
  res.json({ razorpayOrderId: rzpOrder.id, amount: order.amount, key: process.env.RAZORPAY_KEY_ID });
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }
  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.paymentStatus = 'paid';
  order.serviceStatus = 'active';
  order.razorpayPaymentId = razorpay_payment_id;
  order.paidAt = new Date();
  // generate invoice number
  order.invoiceNumber = 'INV-' + Date.now();
  await order.save();
  res.json({ success: true, order });
};