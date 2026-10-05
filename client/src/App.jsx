import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ItemSelector from './components/ItemSelector';
import QuoteSummary from './components/QuoteSummary';
import QuoteModal from './components/QuoteModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { api } from './services/api';
import { STORE_INFO } from './services/catalogData';

export default function App() {
  const [products, setProducts] = useState([]);
  const [storeInfo, setStoreInfo] = useState(STORE_INFO);
  const [cartItems, setCartItems] = useState([]);
  const [generatedQuote, setGeneratedQuote] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Admin routing state
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Check initial URL for /admin
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/admin') || hash === '#admin') {
      if (api.isAdminLoggedIn()) {
        setIsAdminView(true);
      } else {
        setIsAdminLoginOpen(true);
      }
    }
  }, []);

  // Fetch initial catalog
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      const prods = await api.getProducts();
      setProducts(prods);
      const store = await api.getStoreInfo();
      setStoreInfo(store);
    } catch (err) {
      console.warn("Error loading catalog:", err);
    }
  };

  // Add Item to Cart
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      // If exact same product & color exists, increment quantity
      const existingIdx = prev.findIndex(
        i => i.productId === item.productId && i.color === item.color
      );
      if (existingIdx !== -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + item.quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          total: updated[existingIdx].price * newQty
        };
        return updated;
      }
      return [...prev, item];
    });

    // Smooth scroll down to summary if it's the first item
    if (cartItems.length === 0) {
      setTimeout(() => {
        const el = document.getElementById('quote-summary-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  // Remove Item
  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  // Update Quantity
  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: newQty,
        total: updated[index].price * newQty
      };
      return updated;
    });
  };

  // "+ Add Another Item" row click -> scrolls to selector
  const handleAddNewRowClick = () => {
    const el = document.getElementById('item-selector-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate Quote
  const handleGenerateQuote = async (quoteData) => {
    // Save to Cloud DB / API
    const res = await api.saveQuote(quoteData);
    const finalQuote = res.quote || quoteData;
    setGeneratedQuote(finalQuote);
    setIsQuoteModalOpen(true);
  };

  // Open Admin View or Login
  const handleToggleAdmin = () => {
    if (api.isAdminLoggedIn()) {
      setIsAdminView(true);
      window.history.pushState({}, '', '/admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminView(true);
    window.history.pushState({}, '', '/admin');
  };

  const handleBackToQuote = () => {
    setIsAdminView(false);
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 font-sans antialiased">
      
      {/* Top Header */}
      <Header
        storeInfo={storeInfo}
        isAdminView={isAdminView}
        onToggleAdmin={handleToggleAdmin}
        onBackToQuote={handleBackToQuote}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {isAdminView ? (
          <AdminDashboard
            onBackToUser={handleBackToQuote}
            onCatalogUpdated={loadCatalog}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
            
            {/* Quick Hero Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  ⚡ Finolex Authorized Price Portal
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Instant Quotation Generator
                </h2>
              </div>

              <div className="bg-emerald-900/80 border border-emerald-600/50 rounded-2xl p-3.5 text-center min-w-[200px]">
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                  Price List Effective From
                </span>
                <span className="text-xl font-black text-amber-300 font-mono">
                  {storeInfo.priceListDate}
                </span>
                <span className="text-[11px] text-emerald-200 block mt-1">
                  GST 18% Calculated Automatically
                </span>
              </div>
            </div>

            {/* Product Quick-Add Bar */}
            <section id="item-selector-section">
              <ItemSelector
                products={products}
                onAddToCart={handleAddToCart}
              />
            </section>

            {/* Quotation Summary & Calculations */}
            <section id="quote-summary-section">
              <QuoteSummary
                items={cartItems}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
                onAddNewRowClick={handleAddNewRowClick}
                onGenerateQuote={handleGenerateQuote}
              />
            </section>

          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        storeInfo={storeInfo}
        onOpenAdmin={handleToggleAdmin}
      />

      {/* Official Quotation Modal Card */}
      {isQuoteModalOpen && (
        <QuoteModal
          quote={generatedQuote}
          storeInfo={storeInfo}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}

      {/* Admin Login Dialog */}
      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

    </div>
  );
}
