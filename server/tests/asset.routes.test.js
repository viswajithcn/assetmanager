const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Asset = require('../models/asset.model');
const assetRoutes = require('../routes/asset.routes');

const app = express();
app.use(express.json());
app.use('/api/assets', assetRoutes);

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/assetmanager_test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Asset.deleteMany();
});

describe('Asset API', () => {
  test('GET /api/assets returns 200 and an array', async () => {
    const res = await request(app).get('/api/assets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/assets creates asset and returns 201', async () => {
    const assetData = {
      assetTag: 'A1001',
      assetType: 'Laptop',
      manufacturer: 'Dell',
      model: 'XPS 13',
      serialNumber: 'SN123456'
    };
    const res = await request(app).post('/api/assets').send(assetData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.assetTag).toBe(assetData.assetTag);
  });
});
