import * as htmlToImage from 'html-to-image';

/**
 * Accurately captures the quotation card DOM element into a full-height PNG Data URL.
 * Automatically handles multiple order lines by computing exact content scrollHeight,
 * resetting parent scroll offsets, and applying fixed 820px canvas dimensions.
 */
async function captureQuoteDataUrl(elementId) {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error("Quotation card element not found");
  }

  // Find scrollable parent container (if any)
  const scrollContainer = node.parentElement;
  const prevScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
  const prevScrollLeft = scrollContainer ? scrollContainer.scrollLeft : 0;

  try {
    // 1. Temporarily reset scroll offset so the captured canvas is not shifted or cut off
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
      scrollContainer.scrollLeft = 0;
    }

    // 2. Allow DOM layout to settle
    await new Promise(resolve => setTimeout(resolve, 60));

    // 3. Compute full content dimensions (including all table rows, summary, terms, and footer)
    const fullWidth = 820;
    const computedRect = node.getBoundingClientRect();
    const fullHeight = Math.ceil(
      Math.max(
        node.scrollHeight,
        node.offsetHeight,
        node.clientHeight,
        computedRect.height
      )
    ) + 6;

    const renderOptions = {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      width: fullWidth,
      height: fullHeight,
      canvasWidth: fullWidth,
      canvasHeight: fullHeight,
      style: {
        width: `${fullWidth}px`,
        minWidth: `${fullWidth}px`,
        maxWidth: `${fullWidth}px`,
        height: `${fullHeight}px`,
        minHeight: `${fullHeight}px`,
        maxHeight: 'none',
        overflow: 'visible',
        margin: '0',
        transform: 'none',
        boxSizing: 'border-box'
      }
    };

    return await htmlToImage.toPng(node, renderOptions);
  } finally {
    // 4. Always restore previous scroll position
    if (scrollContainer) {
      scrollContainer.scrollTop = prevScrollTop;
      scrollContainer.scrollLeft = prevScrollLeft;
    }
  }
}

/**
 * Downloads a DOM element as a high-resolution PNG image
 */
export async function downloadQuoteImage(elementId, customerName = 'Customer', quoteId = 'BLQ') {
  const dataUrl = await captureQuoteDataUrl(elementId);

  const cleanName = customerName.replace(/[^a-zA-Z0-9]/g, '_') || 'Quote';
  const fileName = `Bodhilightning_Quote_${cleanName}_${quoteId}.png`;

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();

  return { success: true, fileName, dataUrl };
}

/**
 * Converts DOM element to an image File object for Web Share API
 */
export async function getQuoteImageFile(elementId, customerName = 'Customer', quoteId = 'BLQ') {
  const dataUrl = await captureQuoteDataUrl(elementId);
  if (!dataUrl) return null;

  const res = await fetch(dataUrl);
  const blob = await res.blob();

  const cleanName = customerName.replace(/[^a-zA-Z0-9]/g, '_') || 'Quote';
  const fileName = `Bodhilightning_Quote_${cleanName}_${quoteId}.png`;
  return new File([blob], fileName, { type: 'image/png' });
}

/**
 * Generates formatted WhatsApp message text
 */
export function formatWhatsAppMessage(quote, storeInfo) {
  const itemsText = quote.items
    .map((item, idx) => {
      const colorText = item.color && item.color !== 'Single Colour' ? ` [${item.color}]` : '';
      return `${idx + 1}. *${item.category}* (${item.length}, ${item.size}${colorText}) × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`;
    })
    .join('\n');

  return (
`⚡ *QUOTATION - ${storeInfo.name}, ${storeInfo.location.toUpperCase()}*
📞 *Contact:* +91 ${storeInfo.phone}
━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${quote.customerName}
🔖 *Quote ID:* ${quote.id || 'BLQ-' + Date.now().toString().slice(-6)}
📅 *Date:* ${new Date().toLocaleDateString('en-IN')}

📦 *ITEMS QUOTED:*
${itemsText}

━━━━━━━━━━━━━━━━━━
💵 *Subtotal:* ₹${quote.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
🏷️ *Discount (${quote.discountPercentage}%):* -₹${quote.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
📊 *Taxable Value:* ₹${quote.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
🏛️ *GST (18%):* +₹${quote.gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
💰 *FINAL QUOTED PRICE: ₹${quote.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}*
━━━━━━━━━━━━━━━━━━
_Finolex Price List Ref: ${storeInfo.priceListDate}_`
  );
}

/**
 * Shares quotation to WhatsApp (+918940027894)
 */
export async function shareToWhatsApp(elementId, quote, storeInfo) {
  const message = formatWhatsAppMessage(quote, storeInfo);
  const targetPhone = storeInfo.whatsappPhone || '918940027894';

  let sharedViaNative = false;

  try {
    const file = await getQuoteImageFile(elementId, quote.customerName, quote.id);

    // If Web Share API supports file sharing, invoke it directly
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Quotation for ${quote.customerName} - ${storeInfo.name}`,
        text: message,
        files: [file]
      });
      sharedViaNative = true;
      return { method: 'web_share', success: true };
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      return { method: 'cancelled', success: false };
    }
    console.warn("Native file sharing unavailable, falling back to download + wa.me:", err);
  }

  // Fallback flow:
  // 1. Download the quote image
  try {
    await downloadQuoteImage(elementId, quote.customerName, quote.id);
  } catch (err) {
    console.warn("Auto-download failed:", err);
  }

  // 2. Open WhatsApp link with prefilled message
  const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');

  return { method: 'fallback_wa', success: true };
}
