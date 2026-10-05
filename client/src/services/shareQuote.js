import * as htmlToImage from 'html-to-image';

/**
 * Downloads a DOM element as a high-resolution PNG image
 * Uses fixed document width (820px) to guarantee clean layout and prevent text overlap
 */
export async function downloadQuoteImage(elementId, customerName = 'Customer', quoteId = 'BLQ') {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error("Quotation card element not found");
  }

  // Generate high quality PNG with standard fixed layout
  const dataUrl = await htmlToImage.toPng(node, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
    width: 820,
    style: {
      width: '820px',
      minWidth: '820px',
      maxWidth: '820px',
      margin: '0',
      boxSizing: 'border-box'
    }
  });

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
  const node = document.getElementById(elementId);
  if (!node) return null;

  const blob = await htmlToImage.toBlob(node, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
    width: 820,
    style: {
      width: '820px',
      minWidth: '820px',
      maxWidth: '820px',
      margin: '0',
      boxSizing: 'border-box'
    }
  });

  if (!blob) return null;

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
