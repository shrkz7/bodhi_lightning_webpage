import express from 'express';
import { cloudDb } from '../cloudDb.js';

const router = express.Router();

// Simple in-memory session tokens for admin
const validTokens = new Set();

// Admin Authentication Middleware
export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ success: false, error: "Unauthorized: Admin credentials required" });
  }
  next();
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: "Username and password required" });
  }

  if (cloudDb.verifyAdmin(username, password)) {
    const token = `adm_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    validTokens.add(token);
    return res.json({
      success: true,
      token,
      message: "Admin authentication successful",
      user: { username }
    });
  }

  return res.status(401).json({ success: false, error: "Invalid admin credentials" });
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) validTokens.delete(token);
  res.json({ success: true, message: "Logged out successfully" });
});

// GET /api/admin/verify
router.get('/verify', requireAdmin, (req, res) => {
  res.json({ success: true, valid: true });
});

// GET /api/admin/products
router.get('/products', requireAdmin, async (req, res) => {
  try {
    const products = await cloudDb.getProducts();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/products - Add product
router.post('/products', requireAdmin, async (req, res) => {
  try {
    const { category, length, size, price, colors } = req.body;
    if (!category || !length || !size || price === undefined) {
      return res.status(400).json({ success: false, error: "Category, length, size, and price are required" });
    }

    const newProd = await cloudDb.addProduct({
      category,
      length,
      size,
      price: Number(price),
      colors: Array.isArray(colors) && colors.length ? colors : ["Single Colour"]
    });

    res.json({ success: true, product: newProd });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/products/:id - Update product
router.put('/products/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await cloudDb.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/products/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await cloudDb.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/reset - Reset to default Finolex price list
router.post('/reset', requireAdmin, async (req, res) => {
  try {
    const products = await cloudDb.resetCatalogToDefault();
    res.json({ success: true, message: "Catalog reset to original Finolex price list", products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/quotes - View customer quotes
router.get('/quotes', requireAdmin, async (req, res) => {
  try {
    const quotes = await cloudDb.getQuotes();
    res.json({ success: true, quotes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET & POST /api/admin/cloud-settings
router.get('/cloud-settings', requireAdmin, (req, res) => {
  res.json({ success: true, settings: cloudDb.getCloudSettings() });
});

router.post('/cloud-settings', requireAdmin, (req, res) => {
  try {
    const updated = cloudDb.updateCloudSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
