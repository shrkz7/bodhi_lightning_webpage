import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, Check, ChevronDown } from 'lucide-react';

export const COLOR_CONFIG = {
  'Red': { bg: '#ef4444', border: '#dc2626', ring: '#f87171' },
  'Black': { bg: '#18181b', border: '#09090b', ring: '#52525b' },
  'Yellow': { bg: '#eab308', border: '#ca8a04', ring: '#facc15' },
  'Blue': { bg: '#2563eb', border: '#1d4ed8', ring: '#60a5fa' },
  'Green': { bg: '#16a34a', border: '#15803d', ring: '#4ade80' },
  'Single Colour': { bg: '#94a3b8', border: '#64748b', ring: '#cbd5e1' }
};

export default function ItemSelector({ products, onAddToCart }) {
  // 1. Available Categories
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set);
  }, [products]);

  // Current Selections
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('Red');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close color dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsColorDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize category
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // 2. Available Lengths for selected Category
  const availableLengths = useMemo(() => {
    if (!selectedCategory) return [];
    const items = products.filter(p => p.category === selectedCategory);
    return Array.from(new Set(items.map(p => p.length)));
  }, [products, selectedCategory]);

  useEffect(() => {
    if (availableLengths.length > 0) {
      if (!availableLengths.includes(selectedLength)) {
        setSelectedLength(availableLengths[0]);
      }
    } else {
      setSelectedLength('');
    }
  }, [availableLengths, selectedLength]);

  // 3. Available Sizes for selected Category & Length
  const availableSizes = useMemo(() => {
    if (!selectedCategory || !selectedLength) return [];
    return products.filter(p => p.category === selectedCategory && p.length === selectedLength);
  }, [products, selectedCategory, selectedLength]);

  useEffect(() => {
    if (availableSizes.length > 0) {
      const exists = availableSizes.some(item => item.size === selectedSize);
      if (!exists) {
        setSelectedSize(availableSizes[0].size);
      }
    } else {
      setSelectedSize('');
    }
  }, [availableSizes, selectedSize]);

  // 4. Current Matched Product
  const currentProduct = useMemo(() => {
    return products.find(p => 
      p.category === selectedCategory && 
      p.length === selectedLength && 
      p.size === selectedSize
    );
  }, [products, selectedCategory, selectedLength, selectedSize]);

  // Check if multiple colors are supported
  const isMultiColor = useMemo(() => {
    if (!currentProduct) return false;
    return currentProduct.colors && currentProduct.colors.length > 1;
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      if (isMultiColor) {
        if (!currentProduct.colors.includes(selectedColor)) {
          setSelectedColor(currentProduct.colors[0] || 'Red');
        }
      } else {
        setSelectedColor('Single Colour');
      }
    }
  }, [currentProduct, isMultiColor, selectedColor]);

  // Handle Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    const count = Math.max(1, parseInt(quantity) || 1);
    const itemToAdd = {
      productId: currentProduct.id,
      category: currentProduct.category,
      length: currentProduct.length,
      size: currentProduct.size,
      color: selectedColor,
      price: currentProduct.price,
      quantity: count,
      total: currentProduct.price * count
    };

    onAddToCart(itemToAdd);

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const currentColorConfig = COLOR_CONFIG[selectedColor] || { bg: '#94a3b8', border: '#64748b' };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-200/80 p-4 sm:p-5">
      <form onSubmit={handleAddToCart} className="space-y-3">
        
        {/* Single Row Product Selection Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          
          {/* 1. Category */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-zinc-50 hover:bg-white border border-zinc-300 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer truncate"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Length */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-1">
              Length
            </label>
            <select
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
              className="w-full bg-zinc-50 hover:bg-white border border-zinc-300 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer"
            >
              {availableLengths.map((len) => (
                <option key={len} value={len}>
                  {len}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Size */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-1">
              Size / Spec
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-zinc-50 hover:bg-white border border-zinc-300 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer truncate"
            >
              {availableSizes.map((item) => (
                <option key={item.id} value={item.size}>
                  {item.size} (₹{item.price.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          {/* 4. Colour with Colored Dots Matching Respective Color */}
          <div className="lg:col-span-2 relative" ref={dropdownRef}>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide">
                Colour
              </label>
              {/* Direct Color Dot Buttons for 1-click selection */}
              {isMultiColor && (
                <div className="flex items-center gap-1">
                  {currentProduct.colors.map((color) => {
                    const cfg = COLOR_CONFIG[color] || { bg: '#888', border: '#555' };
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={`Select ${color}`}
                        className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                          isSelected ? 'scale-125 ring-2 ring-offset-1 ring-zinc-700' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: cfg.bg,
                          borderColor: cfg.border
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {isMultiColor ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                  className="w-full bg-zinc-50 hover:bg-white border border-zinc-300 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold text-xs sm:text-sm flex items-center justify-between focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block border shadow-xs flex-shrink-0"
                      style={{
                        backgroundColor: currentColorConfig.bg,
                        borderColor: currentColorConfig.border
                      }}
                    />
                    <span>{selectedColor}</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-1 flex-shrink-0" />
                </button>

                {/* Floating Dropdown with Matching Color Dots */}
                {isColorDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl z-30 p-1.5 space-y-1 animate-scaleUp">
                    {currentProduct.colors.map((color) => {
                      const cfg = COLOR_CONFIG[color] || { bg: '#888', border: '#555' };
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setSelectedColor(color);
                            setIsColorDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-emerald-50 text-emerald-950 font-bold' 
                              : 'hover:bg-zinc-100 text-zinc-800'
                          }`}
                        >
                          {/* Dedicated Matching Color Dot */}
                          <span
                            className="w-3.5 h-3.5 rounded-full inline-block border shadow-xs flex-shrink-0"
                            style={{
                              backgroundColor: cfg.bg,
                              borderColor: cfg.border
                            }}
                          />
                          <span>{color}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-500 text-xs sm:text-sm font-medium truncate flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border shadow-xs bg-slate-400 border-slate-500"
                  />
                  <span>Single Colour</span>
                </span>
                <span className="text-[10px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-mono">Std</span>
              </div>
            )}
          </div>

          {/* 5. Count Needed */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-1">
              Count
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-2 py-2.5 text-center text-zinc-900 font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* 6. Price & Add to Cart Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={!currentProduct}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-sm transition-all cursor-pointer ${
                addedAnimation 
                  ? 'bg-emerald-600 ring-2 ring-emerald-400' 
                  : 'bg-emerald-700 hover:bg-emerald-800 active:scale-98'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Small live subtotal bar with colored dot */}
        {currentProduct && (
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1 px-1">
            <div className="flex items-center gap-1.5 truncate">
              <span>Selected:</span>
              <strong className="text-zinc-800">{currentProduct.category}</strong>
              <span>•</span>
              <span>{currentProduct.length}</span>
              <span>•</span>
              <span>{currentProduct.size}</span>
              <span>•</span>
              <span
                className="w-2.5 h-2.5 rounded-full inline-block border flex-shrink-0"
                style={{
                  backgroundColor: currentColorConfig.bg,
                  borderColor: currentColorConfig.border
                }}
              />
              <span className="font-semibold text-zinc-800">{selectedColor}</span>
            </div>
            <span className="font-mono flex-shrink-0 ml-2">
              Unit Rate: <strong className="text-emerald-700 font-bold">₹{currentProduct.price.toLocaleString('en-IN')}</strong> × {quantity} = <strong className="text-zinc-900 font-bold">₹{(currentProduct.price * quantity).toLocaleString('en-IN')}</strong>
            </span>
          </div>
        )}

      </form>
    </div>
  );
}
