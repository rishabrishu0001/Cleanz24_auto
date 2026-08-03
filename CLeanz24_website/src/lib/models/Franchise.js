import mongoose from 'mongoose';

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  modelType: { type: String, default: 'General Inquiry' }
}, { timestamps: true });

export default mongoose.models.Franchise || mongoose.model('Franchise', franchiseSchema);
