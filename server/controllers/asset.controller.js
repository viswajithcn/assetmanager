const Asset = require('../models/asset.model');
const AuditLog = require('../models/AuditLog');

// Checkin asset (return to stock)
exports.checkinAsset = async (req, res) => {
  const { assetId } = req.body;
  try {
    const asset = await Asset.findById(assetId);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    const prevUserId = asset.assignedTo;
    asset.status = 'In Stock';
    asset.assignedTo = null;
    await asset.save();
    // Create audit log
    await AuditLog.create({
      assetId: asset._id,
      userId: prevUserId,
      action: 'Checked In'
    });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create a new asset
exports.createAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate('assignedTo');
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate('assignedTo');
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Checkout asset to a user
exports.checkoutAsset = async (req, res) => {
  const { assetId, userId } = req.body;
  try {
    const asset = await Asset.findById(assetId);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    asset.status = 'In Use';
    asset.assignedTo = userId;
    await asset.save();
    // Create audit log
    await AuditLog.create({
      assetId: asset._id,
      userId,
      action: 'Checked Out'
    });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
