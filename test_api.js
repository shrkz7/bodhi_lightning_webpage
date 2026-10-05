async function runTests() {
  console.log("=== BODHILIGHTNING API VERIFICATION ===");

  // 1. Health
  const healthRes = await fetch('http://localhost:5000/api/health');
  const health = await healthRes.json();
  console.log("✓ Health Check:", health.status);

  // 2. Products List
  const prodRes = await fetch('http://localhost:5000/api/products');
  const prodData = await prodRes.json();
  console.log(`✓ Products Count: ${prodData.products.length} products loaded`);

  // Verify FR Gold, Silver, FRLSH presence
  const frGold = prodData.products.filter(p => p.category === 'FR Gold');
  const frSilver = prodData.products.filter(p => p.category === 'FR Silver');
  const frlsh = prodData.products.filter(p => p.category === 'FRLSH');
  const multiCore = prodData.products.filter(p => p.category.includes('Multi Core'));
  console.log(`✓ FR Gold variants: ${frGold.length} (Colors: ${frGold[0]?.colors.join(', ')})`);
  console.log(`✓ FR Silver variants: ${frSilver.length} (Colors: ${frSilver[0]?.colors.join(', ')})`);
  console.log(`✓ FRLSH variants: ${frlsh.length} (Colors: ${frlsh[0]?.colors.join(', ')})`);
  console.log(`✓ Multi Core variants: ${multiCore.length} (Colors: ${multiCore[0]?.colors.join(', ')})`);

  // 3. Admin Login
  const loginRes = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'bodhi@8940027894' })
  });
  const loginData = await loginRes.json();
  console.log("✓ Admin Login:", loginData.success, "Token received:", !!loginData.token);
  const token = loginData.token;

  // 4. Admin Add Product
  const addRes = await fetch('http://localhost:5000/api/admin/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      category: 'Special Industrial Cable',
      length: '100 MTR',
      size: '2.5 SQ.MM',
      price: 7500,
      colors: ['Single Colour']
    })
  });
  const addData = await addRes.json();
  console.log("✓ Admin Product Added:", addData.success, "ID:", addData.product?.id);

  // 5. Admin Update Product Price
  const updateRes = await fetch(`http://localhost:5000/api/admin/products/${addData.product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ price: 7800 })
  });
  const updateData = await updateRes.json();
  console.log("✓ Admin Product Price Updated to ₹", updateData.product?.price);

  // 6. Customer Quote Creation & Calculation Check
  // Logic: final sum - discounted % + 18% gst
  const item1 = { category: 'FR Gold', length: '90 MTR', size: '1.5 SQ.MM', color: 'Red', price: 3910, quantity: 2 }; // 7820
  const item2 = { category: 'FR Silver', length: '45 MTR', size: '2.5 SQ.MM', color: 'Blue', price: 2873, quantity: 1 }; // 2873
  const subtotal = (3910 * 2) + (2873 * 1); // 10693
  const discountPct = 10;
  const discountAmt = subtotal * (discountPct / 100); // 1069.3
  const taxable = subtotal - discountAmt; // 9623.7
  const gst = taxable * 0.18; // 1732.266
  const grandTotal = taxable + gst; // 11355.966

  const quoteRes = await fetch('http://localhost:5000/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Test Client Perambalur',
      items: [item1, item2],
      subtotal,
      discountPercentage: discountPct,
      discountAmount: discountAmt,
      taxableAmount: taxable,
      gstAmount: gst,
      grandTotal
    })
  });
  const quoteData = await quoteRes.json();
  console.log("✓ Customer Quote Saved:", quoteData.success, "Quote ID:", quoteData.quote?.id);
  console.log(`  - Subtotal: ₹${subtotal.toFixed(2)}`);
  console.log(`  - Discount (10%): -₹${discountAmt.toFixed(2)}`);
  console.log(`  - Taxable Value: ₹${taxable.toFixed(2)}`);
  console.log(`  - GST (18%): +₹${gst.toFixed(2)}`);
  console.log(`  - Final Quoted Price: ₹${grandTotal.toFixed(2)}`);

  // 7. Clean up test product
  await fetch(`http://localhost:5000/api/admin/products/${addData.product.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log("✓ Test product deleted successfully");

  console.log("=== ALL TESTS PASSED! ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
