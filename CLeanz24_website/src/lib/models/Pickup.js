import mongoose from 'mongoose';

const pickupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  service: { type: String },
  date: { type: String },
  time: { type: String },
  address: { type: String },
  type: { type: String },
  source: { type: String },
  price: { type: Number },
  isMember: { type: Boolean }
}, { timestamps: true });

export default mongoose.models.Pickup || mongoose.model('Pickup', pickupSchema);
