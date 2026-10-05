import React, { useState } from 'react';
import { X, Download, Share2, Printer, CheckCircle, AlertCircle, Phone, MapPin, Zap } from 'lucide-react';
import { downloadQuoteImage, shareToWhatsApp } from '../services/shareQuote';
import { COLOR_CONFIG } from './ItemSelector';

export default function QuoteModal({ quote, storeInfo, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareSuccessMsg, setShareSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!quote) return null;

  const quoteId = quote.id || `BLQ-${Date.now().toString().slice(-6)}`;
  const cardElementId = 'official-quotation-card';

  const handleDownloadImage = async () => {
    try {
      setDownloading(true);
      setErrorMsg('');
      await downloadQuoteImage(cardElementId, quote.customerName, quoteId);
      setShareSuccessMsg('Quotation image downloaded successfully!');
      setTimeout(() => setShareSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('Failed to generate image: ' + err.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = async () => {
    try {
      setSharing(true);
      setErrorMsg('');
      const res = await shareToWhatsApp(cardElementId, { ...quote, id: quoteId }, storeInfo);
      if (res.method === 'web_share') {
        setShareSuccessMsg('Opened share sheet! Select WhatsApp to send quote image.');
      } else if (res.method === 'fallback_wa') {
        setShareSuccessMsg('Quotation image saved! Opening WhatsApp chat with +918940027894...');
      }
      setTimeout(() => setShareSuccessMsg(''), 6000);
    } catch (err) {
      setErrorMsg('Error sharing to WhatsApp: ' + err.message);
    } finally {
      setSharing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-zinc-200 flex flex-col my-auto h-[92vh] sm:h-[94vh] overflow-hidden print:h-auto print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-zinc-900 text-white px-5 py-3.5 flex items-center justify-between flex-shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-bold tracking-wide">Official Quotation Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              title="Print Quote"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {shareSuccessMsg && (
          <div className="bg-emerald-50 text-emerald-800 px-5 py-2.5 text-xs sm:text-sm font-medium border-b border-emerald-200 flex items-center gap-2 flex-shrink-0 animate-fadeIn print:hidden">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{shareSuccessMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 text-red-800 px-5 py-2.5 text-xs sm:text-sm font-medium border-b border-red-200 flex items-center gap-2 flex-shrink-0 print:hidden">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Scrollable Quotation Viewport */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto w-full p-3 sm:p-6 bg-zinc-200/80 flex justify-start sm:justify-center print:p-0 print:bg-white print:overflow-visible">
          
          {/* THE OFFICIAL QUOTATION CARD (DOM node captured as image) */}
          <div
            id={cardElementId}
            className="bg-white border border-zinc-300 shadow-xl rounded-2xl print:shadow-none print:border-none text-zinc-900 flex-shrink-0 self-start mb-4"
            style={{ 
              width: '820px', 
              minWidth: '820px', 
              maxWidth: '820px',
              height: 'auto',
              minHeight: 'fit-content',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif" 
            }}
          >
            {/* Bodhilightning Header Banner */}
            <div className="bg-[#1e7e34] text-white px-6 py-4 text-center border-b-4 border-amber-400 rounded-t-2xl">
              <h1 className="text-2xl font-black tracking-wider uppercase leading-tight">
                {storeInfo.name}, {storeInfo.location}
              </h1>
              <div className="text-xs font-semibold text-emerald-100 mt-1 uppercase tracking-wider">
                FINOLEX PRICE LIST with EF. From {storeInfo.priceListDate}
              </div>
            </div>

            {/* Quote Metadata Bar */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-4 flex items-center justify-between text-xs sm:text-sm">
              <div>
                <span className="text-zinc-500 font-medium block text-xs">Quoted For:</span>
                <span className="text-lg font-black text-zinc-900 leading-tight">
                  {quote.customerName}
                </span>
              </div>

              <div className="text-right space-y-0.5 font-mono text-zinc-600 text-xs">
                <div>
                  <span className="font-semibold text-zinc-500">Quote ID: </span>
                  <strong className="text-zinc-900 font-bold">{quoteId}</strong>
                </div>
                <div>
                  <span className="font-semibold text-zinc-500">Date: </span>
                  <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Quotation Itemized Table */}
            <div className="p-6">
              <table className="w-full text-left text-xs border-collapse border border-zinc-300" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '40px' }} />
                  <col style={{ width: '220px' }} />
                  <col style={{ width: '85px' }} />
                  <col style={{ width: '105px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '90px' }} />
                  <col style={{ width: '45px' }} />
                  <col style={{ width: '105px' }} />
                </colgroup>
                <thead>
                  <tr className="bg-zinc-100 text-zinc-800 font-bold uppercase text-[11px] border-b border-zinc-300 leading-normal">
                    <th className="py-2.5 px-2 border-r border-zinc-300 text-center">#</th>
                    <th className="py-2.5 px-3 border-r border-zinc-300">Product / Category</th>
                    <th className="py-2.5 px-2 border-r border-zinc-300 text-center">Length</th>
                    <th className="py-2.5 px-2.5 border-r border-zinc-300">Size / Spec</th>
                    <th className="py-2.5 px-2.5 border-r border-zinc-300">Colour</th>
                    <th className="py-2.5 px-2.5 border-r border-zinc-300 text-right">Rate (₹)</th>
                    <th className="py-2.5 px-2 border-r border-zinc-300 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {quote.items.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-zinc-50/70' : 'bg-white'}>
                      <td className="py-2.5 px-2 border-r border-zinc-200 text-center text-zinc-500 font-semibold">{idx + 1}</td>
                      <td className="py-2.5 px-3 border-r border-zinc-200 font-bold text-zinc-900 break-words leading-snug">
                        {item.category}
                      </td>
                      <td className="py-2.5 px-2 border-r border-zinc-200 text-zinc-600 text-center whitespace-nowrap">
                        {item.length}
                      </td>
                      <td className="py-2.5 px-2.5 border-r border-zinc-200 text-zinc-700 font-medium whitespace-nowrap">
                        {item.size}
                      </td>
                      <td className="py-2.5 px-2.5 border-r border-zinc-200 text-zinc-800 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border flex-shrink-0"
                            style={{
                              backgroundColor: COLOR_CONFIG[item.color]?.bg || '#94a3b8',
                              borderColor: COLOR_CONFIG[item.color]?.border || '#64748b'
                            }}
                          />
                          <span>{item.color}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 border-r border-zinc-200 text-right font-mono text-zinc-700 whitespace-nowrap">
                        {item.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-2 border-r border-zinc-200 text-center font-bold text-zinc-800 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-zinc-900 whitespace-nowrap">
                        {(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Financial Calculation Summary */}
              <div className="mt-6 flex justify-end">
                <div className="w-80 bg-zinc-50 border border-zinc-300 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-zinc-600">
                    <span>Sum of Items:</span>
                    <span className="font-mono font-bold text-zinc-900">
                      ₹{quote.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-amber-700 font-medium">
                    <span>Discount ({quote.discountPercentage}%):</span>
                    <span className="font-mono">
                      -₹{quote.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-700 border-t border-zinc-200 pt-1.5 font-semibold">
                    <span>Taxable Value:</span>
                    <span className="font-mono">
                      ₹{quote.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-emerald-800 font-medium">
                    <span>GST (18%):</span>
                    <span className="font-mono">
                      +₹{quote.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-t-2 border-emerald-700 pt-2 text-emerald-900">
                    <span className="font-extrabold uppercase text-xs">Final Quoted Price:</span>
                    <span className="text-xl font-black font-mono text-emerald-800">
                      ₹{quote.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Terms & Authorized Signatory */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between gap-4 text-[11px] text-zinc-500">
                <div>
                  <p className="font-medium text-zinc-700">Terms & Conditions:</p>
                  <p>1. Quotation generated based on Finolex Cables dealer price list.</p>
                  <p>2. Subject to product availability at the time of order confirmation.</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-zinc-800 text-xs uppercase tracking-wider mb-4">
                    For {storeInfo.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                    Authorized Signatory
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Stripe */}
            <div className="bg-zinc-800 text-zinc-300 text-center py-2.5 text-[11px] font-medium tracking-wider rounded-b-2xl">
              {storeInfo.name} • {storeInfo.location}
            </div>

          </div>

        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-white border-t border-zinc-200 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 print:hidden">
          <div className="text-xs text-zinc-500 text-center sm:text-left">
            <span>Forward to <strong>+91{storeInfo.whatsappPhone || '8940027894'}</strong> via WhatsApp or download image</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Download as Image */}
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs sm:text-sm transition-all border border-zinc-300 shadow-xs"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>{downloading ? 'Rendering Image...' : 'Download as Image'}</span>
            </button>

            {/* Share to WhatsApp (+918940027894) */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              disabled={sharing}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-emerald-900/20 active:scale-98"
            >
              <Share2 className="w-4 h-4 text-amber-300" />
              <span>{sharing ? 'Sharing...' : 'Share to WhatsApp'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
