const PDFDocument = require('pdfkit');
const path = require('path');

module.exports = (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.fontSize(20).text('GTXNodes.xyz Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${order.invoiceNumber}`);
    doc.text(`Order ID: ${order.orderId}`);
    doc.text(`Date: ${order.paidAt.toDateString()}`);
    doc.text(`Customer: ${order.userId.email}`);
    doc.moveDown();
    doc.text(`Plan: ${order.planId.name}`);
    doc.text(`Amount: ₹${order.amount}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.end();
  });
};