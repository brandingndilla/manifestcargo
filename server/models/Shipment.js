const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  customer: { type: String, required: true },
  phone: { type: String, default: '' },
  destination: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true, min: 0 },
    total: { type: Number, default: 0 }
  }],
  payment: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  status: { type: String, enum: ['loaded', 'not-loaded', 'saved'], default: 'not-loaded' },
  total: { type: Number, default: 0 },
  manifestId: { type: String, ref: 'Manifest' },
  saved: { type: Boolean, default: false },
  loadedQty: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

ShipmentSchema.pre('save', function () {
  this.total = this.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
});

module.exports = mongoose.model('Shipment', ShipmentSchema);