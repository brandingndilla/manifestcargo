const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');
const Manifest = require('../models/Manifest');
const auth = require('../middleware/auth');

// Create shipment
router.post('/', auth, async (req, res) => {
  try {
    const { sender, customer, phone, destination, items, payment, status, manifestId } = req.body;

    const manifest = await Manifest.findOne({
      _id: manifestId,
      createdBy: req.user.id
    });

    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    if (manifest.status !== 'DRAFT') {
      return res.status(400).json({ error: 'Cannot add shipments to non-draft manifest' });
    }

    const total = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);

    const shipment = new Shipment({
      sender,
      customer,
      phone,
      destination,
      items,
      payment: payment || 'unpaid',
      status: status || 'not-loaded',
      total,
      manifestId: manifest._id,
      createdBy: req.user.id,
      saved: false
    });

    await shipment.save();

    manifest.shipments.push(shipment._id);
    await manifest.save();

    res.status(201).json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE SHIPMENT - 🔑 KEY FIX: This allows updating manifestId, status, saved
router.put('/:id', auth, async (req, res) => {
  try {
    const { sender, customer, phone, destination, items, payment, status, total, manifestId, saved } = req.body;

    let shipment = await Shipment.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    const oldManifestId = shipment.manifestId;

    // Update fields
    if (sender !== undefined) shipment.sender = sender;
    if (customer !== undefined) shipment.customer = customer;
    if (phone !== undefined) shipment.phone = phone;
    if (destination !== undefined) shipment.destination = destination;
    if (items !== undefined) {
      shipment.items = items;
      shipment.total = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    }
    if (payment !== undefined) shipment.payment = payment;
    if (status !== undefined) shipment.status = status;
    if (total !== undefined) shipment.total = total;
    if (saved !== undefined) shipment.saved = saved;
    
    // 🔑 KEY FIX: Allow updating manifestId
    if (manifestId !== undefined) {
      shipment.manifestId = manifestId;
    }

    await shipment.save();

    // If manifestId changed, update both manifests' shipments arrays
    if (manifestId !== undefined && oldManifestId && oldManifestId.toString() !== manifestId.toString()) {
      // Remove from old manifest
      await Manifest.findByIdAndUpdate(oldManifestId, {
        $pull: { shipments: shipment._id }
      });

      // Add to new manifest
      await Manifest.findByIdAndUpdate(manifestId, {
        $addToSet: { shipments: shipment._id }
      });

      // Recalculate totals for both manifests
      await recalculateManifestTotals(oldManifestId);
      await recalculateManifestTotals(manifestId);
    }

    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE shipment
router.delete('/:id', auth, async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    const manifestId = shipment.manifestId;

    await Shipment.findByIdAndDelete(req.params.id);

    // Remove from manifest
    await Manifest.findByIdAndUpdate(manifestId, {
      $pull: { shipments: shipment._id }
    });

    // Recalculate manifest totals
    await recalculateManifestTotals(manifestId);

    res.json({ message: 'Shipment deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to recalculate manifest totals
async function recalculateManifestTotals(manifestId) {
  const manifest = await Manifest.findById(manifestId).populate('shipments');
  if (!manifest) return;

  const totals = {
    totalItems: 0,
    totalShipments: manifest.shipments.length,
    totalAmount: 0,
    totalCollected: 0,
    totalOutstanding: 0
  };

  manifest.shipments.forEach(s => {
    const itemsTotal = s.items.reduce((sum, item) => sum + item.qty, 0);
    totals.totalItems += itemsTotal;
    totals.totalAmount += s.total || 0;
    if (s.payment === 'paid') {
      totals.totalCollected += s.total || 0;
    } else {
      totals.totalOutstanding += s.total || 0;
    }
  });

  manifest.totals = totals;
  await manifest.save();
}

module.exports = router;