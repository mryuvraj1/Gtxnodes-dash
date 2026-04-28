import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  serviceStatus: 'pending' | 'active' | 'cancelled' | 'expired';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  invoiceNumber?: string;
  paidAt?: Date;
  createdAt: Date;
}

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  serviceStatus: { type: String, enum: ['pending', 'active', 'cancelled', 'expired'], default: 'pending' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  invoiceNumber: { type: String },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
