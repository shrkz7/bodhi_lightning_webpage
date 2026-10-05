import express from 'express';
import { cloudDb } from '../cloudDb.js';

const router = express.Router();

// GET all products for the customer quote builder
router.get('/products', async (req, res) => {
  try {
    const products = await cloudDb.getProducts();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET store info (branding, phone, address, GST rate)
router.get('/store-info', (req, res) => {
  res.json({ success: true, storeInfo: cloudDb.storeInfo });
});

export default router;
