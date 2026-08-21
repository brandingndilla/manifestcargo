const express = require('express');
const router = express.Router();
const Manifest = require('../models/Manifest');
const Shipment = require('../models/Shipment');
const auth = require('../middleware/auth');

// Get all manifests
router.get('/', auth, async (req, res) => {
  try {
    const manifests = await Manifest.find({
      createdBy: req.user.id
    }).populate('shipments').sort({ createdAt: -1 });
    
    res.json(manifests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current manifest
router.get('/current', auth, async (req, res) => {
  try {
    let manifest = await Manifest.findOne({
      createdBy: req.user.id,
      status: 'DRAFT'
    }).populate('shipments');

    if (!manifest) {
      manifest = new Manifest({
        createdBy: req.user.id,
        companyName: req.user.company,
        manifestDate: new Date(),
        status: 'DRAFT'
      });
      await manifest.save();
    }

    res.json(manifest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single manifest
router.get('/:id', auth, async (req, res) => {
  try {
    const manifest = await Manifest.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    }).populate('shipments');

    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    res.json(manifest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create manifest
router.post('/', auth, async (req, res) => {
  try {
    const { truckPlate, driverName, supervisor, manifestDate, status, shipments } = req.body;

    const manifest = new Manifest({
      truckPlate: truckPlate || '',
      driverName: driverName || '',
      supervisor: supervisor || '',
      manifestDate: manifestDate || new Date(),
      status: status || 'DRAFT',
      shipments: shipments || [],
      createdBy: req.user.id,
      companyName: req.user.company
    });

    await manifest.save();
    res.status(201).json(manifest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE MANIFEST - 🔑 KEY FIX: Allow updating shipments array
router.put('/:id', auth, async (req, res) => {
  try {
    const { truckPlate, driverName, supervisor, manifestDate, status, shipments } = req.body;

    let manifest = await Manifest.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    if (truckPlate !== undefined) manifest.truckPlate = truckPlate;
    if (driverName !== undefined) manifest.driverName = driverName;
    if (supervisor !== undefined) manifest.supervisor = supervisor;
    if (manifestDate !== undefined) manifest.manifestDate = manifestDate;
    if (status !== undefined) manifest.status = status;
    
    // 🔑 KEY FIX: Allow updating shipments array
    if (shipments !== undefined) {
      manifest.shipments = shipments;
    }

    await manifest.save();

    // Recalculate totals
    const populatedManifest = await Manifest.findById(manifest._id).populate('shipments');
    const totals = {
      totalItems: 0,
      totalShipments: populatedManifest.shipments.length,
      totalAmount: 0,
      totalCollected: 0,
      totalOutstanding: 0
    };

    populatedManifest.shipments.forEach(s => {
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

    res.json(manifest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE manifest
router.delete('/:id', auth, async (req, res) => {
  try {
    const manifest = await Manifest.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!manifest) {
      return res.status(404).json({ error: 'Manifest not found' });
    }

    // Delete all shipments in this manifest
    await Shipment.deleteMany({
      manifestId: manifest._id
    });

    await Manifest.findByIdAndDelete(req.params.id);

    res.json({ message: 'Manifest deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;