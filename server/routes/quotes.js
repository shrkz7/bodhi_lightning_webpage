import express from 'express';
import { cloudDb } from '../cloudDb.js';

const router = express.Router();

// POST save a customer quote
router.post('/quotes', async (req, res) => {
  try {
    const { customerName, items, subtotal, discountPercentage, discountAmount, taxableAmount, gstAmount, grandTotal, notes } = req.body;
    
    if (!customerName || !items || !items.length) {
      return res.status(400).json({ success: false, error: "Customer name and at least one item are required" });
    }

    const savedQuote = await cloudDb.saveQuote({
      customerName,
      items,
      subtotal: Number(subtotal),
      discountPercentage: Number(discountPercentage) || 0,
      discountAmount: Number(discountAmount) || 0,
      taxableAmount: Number(taxableAmount),
      gstAmount: Number(gstAmount),
      grandTotal: Number(grandTotal),
      notes: notes || ""
    });

    res.json({ success: true, quote: savedQuote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET quote by ID
router.get('/quotes/:id', async (req, res) => {
  try {
    const quote = await cloudDb.getQuoteById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: "Quote not found" });
    }
    res.json({ success: true, quote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
