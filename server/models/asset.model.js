const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  assetTag: {
    type: String,
    unique: true,
    required: true
  },
  assetType: {
    type: String,
    required: true
  },
  manufacturer: String,
  model: String,
  serialNumber: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['In Stock', 'In Use', 'In Repair', 'Disposed'],
    default: 'In Stock'
  },
  purchaseDate: Date,
  warrantyExpiration: Date,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);
