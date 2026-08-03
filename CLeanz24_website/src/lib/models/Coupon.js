import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  _id: { type: String },
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
