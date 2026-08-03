import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  plan: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  startDate: { type: String, required: true },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model('Member', memberSchema);
