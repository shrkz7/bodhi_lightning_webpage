import React, { useState, useEffect } from 'react';
import { 
  Package, Search, Plus, Edit2, Trash2, RotateCcw, 
  Cloud, Save, X, Check, AlertCircle, FileText, ArrowLeft, LogOut, CheckCircle2 
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard({ onBackToUser, onCatalogUpdated }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'quotes' | 'cloud'
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Status feedback
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Edit product modal state
  const [editingProduct, setEditingProduct] = useState(null);

  // Add product modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    category: '',
    length: '',
    size: '',
    price: '',
    colors: 'Single Colour'
  });

  // Cloud settings state
  const [cloudSettings, setCloudSettings] = useState({
    cloudProvider: 'cloud_ready',
    supabaseUrl: '',
    supabaseKey: '',
    firebaseConfig: '',
    adminPassword: ''
  });

  // Load products & quotes on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const prodRes = await api.getProducts();
      setProducts(prodRes);

      const quotesRes = await api.adminGetQuotes();
      if (quotesRes.success) setQuotes(quotesRes.quotes || []);

      const settingsRes = await api.adminGetCloudSettings();
      if (settingsRes.success) setCloudSettings(prev => ({ ...prev, ...settingsRes.settings }));
    } catch (err) {
      showStatus('error', 'Failed to load admin data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  // Distinct categories for filter
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = 
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.length.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Update Product
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await api.adminUpdateProduct(editingProduct.id, {
        price: parseFloat(editingProduct.price),
        size: editingProduct.size,
        length: editingProduct.length
      });

      if (res.success) {
        showStatus('success', `Updated ${editingProduct.category} (${editingProduct.size}) successfully!`);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.product : p));
        setEditingProduct(null);
        if (onCatalogUpdated) onCatalogUpdated();
      } else {
        showStatus('error', res.error || 'Failed to update product');
      }
    } catch (err) {
      showStatus('error', err.message);
    }
  };

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const colorArr = newProduct.colors.split(',').map(s => s.trim()).filter(Boolean);
      const res = await api.adminAddProduct({
        category: newProduct.category,
        length: newProduct.length,
        size: newProduct.size,
        price: parseFloat(newProduct.price),
        colors: colorArr.length ? colorArr : ['Single Colour']
      });

      if (res.success) {
        showStatus('success', 'New product added to catalog and Cloud DB!');
        setProducts(prev => [res.product, ...prev]);
        setIsAddModalOpen(false);
        setNewProduct({ category: '', length: '', size: '', price: '', colors: 'Single Colour' });
        if (onCatalogUpdated) onCatalogUpdated();
      } else {
        showStatus('error', res.error || 'Failed to add product');
      }
    } catch (err) {
      showStatus('error', err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await api.adminDeleteProduct(id);
      if (res.success) {
        showStatus('success', 'Product removed from catalog and Cloud DB');
        setProducts(prev => prev.filter(p => p.id !== id));
        if (onCatalogUpdated) onCatalogUpdated();
      } else {
        showStatus('error', res.error || 'Failed to delete');
      }
    } catch (err) {
      showStatus('error', err.message);
    }
  };

  // Reset to default Finolex Price List
  const handleResetCatalog = async () => {
    if (!window.confirm('Reset catalog to the original Finolex price list? Any custom items will be overwritten.')) return;

    try {
      const res = await api.adminResetCatalog();
      if (res.success) {
        showStatus('success', 'Catalog restored to default Finolex Price List!');
        setProducts(res.products);
        if (onCatalogUpdated) onCatalogUpdated();
      }
    } catch (err) {
      showStatus('error', err.message);
    }
  };

  // Save Cloud DB settings
  const handleSaveCloudSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await api.adminUpdateCloudSettings(cloudSettings);
      if (res.success) {
        showStatus('success', 'Cloud database settings updated successfully!');
      } else {
        showStatus('error', res.error || 'Failed to update cloud settings');
      }
    } catch (err) {
      showStatus('error', err.message);
    }
  };

  const handleLogout = () => {
    api.adminLogout();
    onBackToUser();
  };

  return (
    <div className="bg-zinc-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Navigation Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToUser}
              className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition-colors"
              title="Return to customer quote page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900">
                  Bodhilightning Admin Control
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Cloud DB Active
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Manage Finolex product lines, lengths, sizes, colors, and prices
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'products' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'quotes' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Quotes History ({quotes.length})
            </button>
            <button
              onClick={() => setActiveTab('cloud')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'cloud' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Cloud DB Settings
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast Notification */}
        {statusMsg.text && (
          <div className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2 border animate-fadeIn ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
              : 'bg-red-50 text-red-800 border-red-300'
          }`}>
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* TAB 1: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 sm:p-6 space-y-5">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search size, length, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-56 py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 font-medium cursor-pointer"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                {/* Add Product Button */}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>

                {/* Reset to Default */}
                <button
                  onClick={handleResetCatalog}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold border border-zinc-200 transition-colors"
                  title="Restore original Finolex price list"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-zinc-100 text-zinc-700 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Length</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Colors</th>
                    <th className="py-3 px-4 text-right">Price (₹)</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-zinc-500">
                        No products match your search or filter.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-zinc-900">{p.category}</td>
                        <td className="py-3 px-4 text-zinc-600 font-medium">{p.length}</td>
                        <td className="py-3 px-4 text-zinc-800 font-semibold">{p.size}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 font-mono">
                            {p.colors && p.colors.length > 1 ? `${p.colors.length} Colors (R/B/Y/B/G)` : 'Single Colour'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-800 text-sm">
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => setEditingProduct({ ...p })}
                              className="p-1.5 text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, `${p.category} ${p.size}`)}
                              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-zinc-500 text-right">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        )}

        {/* TAB 2: QUOTES HISTORY */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              Customer Quotation History
            </h2>
            <p className="text-xs text-zinc-500">
              Quotes generated by customers are logged here for follow-up and verification.
            </p>

            {quotes.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                No customer quotes generated yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-zinc-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-100 text-zinc-700 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Quote ID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4 text-center">Items</th>
                      <th className="py-3 px-4 text-right">Discount</th>
                      <th className="py-3 px-4 text-right">Final Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-zinc-50">
                        <td className="py-3 px-4 font-mono font-bold text-zinc-900">{q.id}</td>
                        <td className="py-3 px-4 text-zinc-600">
                          {new Date(q.createdAt || Date.now()).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-bold text-zinc-800">{q.customerName}</td>
                        <td className="py-3 px-4 text-center font-mono">{q.items ? q.items.length : 0}</td>
                        <td className="py-3 px-4 text-right text-amber-700 font-mono">
                          {q.discountPercentage}% (-₹{q.discountAmount?.toLocaleString('en-IN')})
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-800">
                          ₹{q.grandTotal?.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLOUD DATABASE SETTINGS */}
        {activeTab === 'cloud' && (
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-5 sm:p-7 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                  Free Cloud Database Configuration
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500">
                  Zero local storage. Seamless connection to free cloud databases (Supabase / Firebase).
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Active Cloud Database State:
              </div>
              <p>
                The application operates with <strong>zero local storage dependencies</strong>. You can connect your free Supabase PostgreSQL database or Firebase Firestore instance below.
              </p>
            </div>

            <form onSubmit={handleSaveCloudSettings} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Cloud DB Provider
                </label>
                <select
                  value={cloudSettings.cloudProvider}
                  onChange={(e) => setCloudSettings({ ...cloudSettings, cloudProvider: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-900 font-medium text-sm"
                >
                  <option value="cloud_ready">Cloud Ready (In-Memory Cloud Engine - Zero Local Files)</option>
                  <option value="supabase">Supabase PostgreSQL (Free Tier)</option>
                  <option value="firebase">Google Firebase Firestore (Free Tier)</option>
                </select>
              </div>

              {cloudSettings.cloudProvider === 'supabase' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                      Supabase Project URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://xyzcompany.supabase.co"
                      value={cloudSettings.supabaseUrl}
                      onChange={(e) => setCloudSettings({ ...cloudSettings, supabaseUrl: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-900 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                      Supabase Anon Public API Key
                    </label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIs..."
                      value={cloudSettings.supabaseKey}
                      onChange={(e) => setCloudSettings({ ...cloudSettings, supabaseKey: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-900 font-mono text-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Update Admin Password (Optional)
                </label>
                <input
                  type="password"
                  placeholder="New password (leave blank to keep current)"
                  value={cloudSettings.adminPassword}
                  onChange={(e) => setCloudSettings({ ...cloudSettings, adminPassword: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-zinc-900 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Cloud Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL: EDIT PRODUCT */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-zinc-200">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
                <h3 className="text-lg font-bold text-zinc-900">
                  Edit Product Price & Spec
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <span className="text-xs text-zinc-500 font-medium">Category</span>
                  <div className="text-sm font-bold text-zinc-800">{editingProduct.category}</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Length</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.length}
                    onChange={(e) => setEditingProduct({ ...editingProduct, length: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-sm text-zinc-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Size / Spec</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.size}
                    onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-sm text-zinc-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-lg font-mono font-bold text-emerald-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD PRODUCT */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-zinc-200">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
                <h3 className="text-lg font-bold text-zinc-900">
                  Add New Product to Catalog
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Product Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FR Gold or Industrial Cable"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-sm text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Length</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 90 MTR, 180 MTR, 100 MTR"
                    value={newProduct.length}
                    onChange={(e) => setNewProduct({ ...newProduct, length: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-sm text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Size / Spec</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1.5 SQ.MM or RG59 (3+1)"
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-sm text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Price in INR (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 3910"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-base font-mono font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Colors (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Single Colour or Red, Black, Yellow, Blue, Green"
                    value={newProduct.colors}
                    onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2 text-xs text-zinc-800"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-sm"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
