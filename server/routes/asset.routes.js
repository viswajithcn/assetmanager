const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset.controller');

// POST /api/assets - Create asset
router.post('/', assetController.createAsset);

// GET /api/assets - Get all assets
router.get('/', assetController.getAllAssets);

// GET /api/assets/:id - Get asset by ID
router.get('/:id', assetController.getAssetById);

// PUT /api/assets/:id - Update asset
router.put('/:id', assetController.updateAsset);

// PUT /api/assets/:id/checkout - Checkout asset to user
router.put('/:id/checkout', (req, res) => {
  req.body.assetId = req.params.id;
  assetController.checkoutAsset(req, res);
});

// PUT /api/assets/:id/checkin - Checkin asset (return to stock)
router.put('/:id/checkin', (req, res) => {
  req.body.assetId = req.params.id;
  assetController.checkinAsset(req, res);
});

// DELETE /api/assets/:id - Delete asset
router.delete('/:id', assetController.deleteAsset);

module.exports = router;
