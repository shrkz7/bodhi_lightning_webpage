import React, { useState } from 'react';
import { Trash2, Plus, ReceiptText, Sparkles, User, Percent, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLOR_CONFIG } from './ItemSelector';

export default function QuoteSummary({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onAddNewRowClick,
  onGenerateQuote
}) {
  const [customerName, setCustomerName] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [nameError, setNameError] = useState(false);

  // 1. Calculate Sum
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 2. Calculate Discount: (final sum - discounted %)
  const validDiscountPercent = Math.min(100, Math.max(0, parseFloat(discountPercent) || 0));
  const discountAmount = subtotal * (validDiscountPercent / 100);
  const taxableAmount = subtotal - discountAmount;

  // 3. Calculate 18% GST: (+ 18% gst)
  const gstRate = 0.18;
  const gstAmount = taxableAmount * gstRate;

  // 4. Final Price
  const grandTotal = taxableAmount + gstAmount;

  const handleGetQuote = () => {
    if (!customerName.trim()) {
      setNameError(true);
      const inputEl = document.getElementById('customer-name-input');
      if (inputEl) inputEl.focus();
      return;
    }
    setNameError(false);

    if (items.length === 0) return;

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    onGenerateQuote({
      customerName: customerName.trim(),
      items,
      subtotal,
      discountPercentage: validDiscountPercent,
      discountAmount,
      taxableAmount,
      gstAmount,
      grandTotal
    });
  };

  const colorBadgeMap = {
    'Red': 'bg-red-500 text-white',
    'Black': 'bg-zinc-900 text-white',
    'Yellow': 'bg-yellow-400 text-zinc-900',
    'Blue': 'bg-blue-600 text-white',
    'Green': 'bg-emerald-600 text-white',
    'Single Colour': 'bg-zinc-100 text-zinc-700'
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-5 sm:p-7 space-y-6">
      
      {/* Title & Customer Name Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <ReceiptText className="w-6 h-6 text-emerald-700" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                Quotation Summary
              </h2>
              {items.length > 0 && (
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Items added to quote, discount calculation & final billing
            </p>
          </div>
        </div>

        {/* Customer Name Input */}
        <div className="w-full md:w-72">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            id="customer-name-input"
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              if (nameError && e.target.value.trim()) setNameError(false);
            }}
            className={`w-full bg-zinc-50 border rounded-xl px-4 py-2.5 text-zinc-900 font-medium focus:ring-2 focus:bg-white transition-all text-sm ${
              nameError ? 'border-red-500 focus:ring-red-400 bg-red-50/30' : 'border-zinc-300 focus:ring-emerald-500'
            }`}
          />
          {nameError && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> Please enter customer name to get quote
            </p>
          )}
        </div>
      </div>

      {/* Items Summary Table */}
      {items.length === 0 ? (
        <div className="py-12 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
          <ReceiptText className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-700">No items in quote yet</h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mt-1">
            Select products above (Category → Length → Size → Colour → Count) and click "Add to Cart".
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 sm:px-4">#</th>
                  <th className="py-3 px-3 sm:px-4">Product Category</th>
                  <th className="py-3 px-3 sm:px-4">Length</th>
                  <th className="py-3 px-3 sm:px-4">Size</th>
                  <th className="py-3 px-3 sm:px-4">Colour</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Unit Price</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Qty</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Total</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-medium">
                {items.map((item, idx) => (
                  <tr key={`${item.productId}-${idx}`} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-3 sm:px-4 text-zinc-500 font-bold">{idx + 1}</td>
                    <td className="py-3 px-3 sm:px-4 text-zinc-900 font-bold">
                      {item.category}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-zinc-600">{item.length}</td>
                    <td className="py-3 px-3 sm:px-4 text-zinc-700 font-semibold">{item.size}</td>
                    <td className="py-3 px-3 sm:px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-50 border border-zinc-200">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border flex-shrink-0"
                          style={{
                            backgroundColor: COLOR_CONFIG[item.color]?.bg || '#94a3b8',
                            borderColor: COLOR_CONFIG[item.color]?.border || '#64748b'
                          }}
                        />
                        <span className="text-zinc-800">{item.color}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right font-mono text-zinc-700">
                      ₹{item.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-zinc-900">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right font-mono font-bold text-emerald-800">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* "+ Add Another Item" Button as requested */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={onAddNewRowClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>+ Add Another Item Row</span>
            </button>
          </div>
        </div>
      )}

      {/* Pricing Logic & Financial Breakdown */}
      {items.length > 0 && (
        <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Discount Input & Logic explanation */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-amber-600" />
                Discount on Quoted Price
              </label>
              <span className="text-xs text-zinc-500 font-mono">0% to 100%</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-lg font-bold text-zinc-900 focus:ring-2 focus:ring-amber-500 pr-10"
                  placeholder="0"
                />
                <span className="absolute right-3.5 top-3 text-zinc-400 font-bold">%</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-500 block">Discount Value</span>
                <span className="text-sm font-bold text-amber-700">
                  -₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Quick Discount Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[0, 5, 10, 15, 20, 25].map((pct) => (
                <button
                  type="button"
                  key={pct}
                  onClick={() => setDiscountPercent(pct)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                    validDiscountPercent === pct 
                      ? 'bg-amber-500 text-white border-amber-600' 
                      : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed pt-1 border-t border-zinc-200">
              💡 <strong>Pricing formula:</strong> Final Price = (Total Sum - Discount %) + 18% GST.
            </p>
          </div>

          {/* Financial Calculation Summary Box */}
          <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 border-b border-emerald-800 pb-2 flex items-center justify-between">
              <span>Financial Breakdown</span>
              <span className="text-amber-400 font-mono">18% GST Applicable</span>
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-300">
                <span>Sum of Items ({items.length} items):</span>
                <span className="font-mono font-medium text-white">
                  ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-amber-300">
                <span>Discount ({validDiscountPercent}%):</span>
                <span className="font-mono font-medium">
                  -₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-zinc-300 border-t border-emerald-900 pt-2">
                <span>Taxable Value:</span>
                <span className="font-mono font-medium text-white">
                  ₹{taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-emerald-300">
                <span>GST (18%):</span>
                <span className="font-mono font-medium">
                  +₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Grand Total Highlight */}
            <div className="border-t-2 border-amber-400/80 pt-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-extrabold block">
                  Final Quoted Price
                </span>
                <span className="text-[11px] text-zinc-400">Inclusive of all taxes</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* "Get Quote" Button */}
            <button
              type="button"
              onClick={handleGetQuote}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base active:scale-98"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Get Official Quote Card</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
