const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  modelType: { type: String, default: 'General Inquiry' }
}, { timestamps: true });

module.exports = mongoose.model('Franchise', franchiseSchema);
