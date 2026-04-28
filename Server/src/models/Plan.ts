import mongoose, { Document, Schema } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  price: number;
  discountPrice?: number;
  ram: string;
  cpu: string;
  storage: string;
  backups: string;
  databases: string;
  features: string[];
  badge?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
}

const PlanSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  ram: { type: String },
  cpu: { type: String },
  storage: { type: String },
  backups: { type: String },
  databases: { type: String },
  features: [{ type: String }],
  badge: { type: String },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPlan>('Plan', PlanSchema);
