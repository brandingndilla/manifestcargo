const mongoose = require('mongoose');

const ManifestSchema = new mongoose.Schema({
  manifestNumber: {
    type: String,
    default: () => `MAN-${Date.now().toString(36).toUpperCase()}`
  },
  truckPlate: {
    type: String,
    default: ''
  },
  driverName: {
    type: String,
    default: ''
  },
  supervisor: {
    type: String,
    default: ''
  },
  manifestDate: {
    type: Date,
    default: Date.now
  },
  shipments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment'
  }],
  totals: {
    totalItems: { type: Number, default: 0 },
    totalShipments: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    totalCollected: { type: Number, default: 0 },
    totalOutstanding: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['DRAFT', 'ACTIVE', 'DEPARTED', 'ARRIVED', 'CLOSED'],
    default: 'DRAFT'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  companyName: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Manifest', ManifestSchema);