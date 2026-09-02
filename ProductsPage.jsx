import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '../components/store/ProductCard';
import { FilterSidebar } from '../components/store/FilterSidebar';
import { INITIAL_PRODUCTS } from '../data/products';
import { ArrowUpDown, Search, PackageOpen } from 'lucide-react';

export const ProductsPage = ({ navigate, initialSearch = '', initialCategory = 'All' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity' | 'price-asc' | 'price-desc' | 'newest'
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(6000);
    setSelectedSize(null);
    setSelectedColor(null);
    setSearchQuery('');
    setSortBy('popularity');
  };

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Size filter
      if (selectedSize && (!product.sizes || !product.sizes.includes(selectedSize))) {
        return false;
      }
      // Color filter
      if (selectedColor && (!product.colors || !product.colors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase())))) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.rating - a.rating; // Popularity default
    });
  }, [selectedCategory, maxPrice, selectedSize, selectedColor, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-4 font-medium">
        <span 
          onClick={() => navigate('/')} 
          className="cursor-pointer hover:text-slate-900 transition-colors"
        >
          Home
        </span>
        <span>/</span>
        <span 
          onClick={() => setSelectedCategory('All')} 
          className="cursor-pointer hover:text-slate-900 transition-colors"
        >
          Products
        </span>
        <span>/</span>
        <span className="font-bold text-slate-900">
          {selectedCategory === 'All' ? 'All Departments' : selectedCategory}
        </span>
      </nav>

      {/* Catalog Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white mb-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Omnidash Studio Catalog
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            {selectedCategory === 'All' ? "All Curated Products" : `${selectedCategory.toUpperCase()} COLLECTION`}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
            Explore handcrafted shirts, tailored selvedge denim, premium low-top sneakers, and verified minimalist timepieces.
          </p>
        </div>
      </div>

      {/* Two-Column Grid: Filter Sidebar (Left) + Product Catalog (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Right Column: Catalog Grid & Sort Controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Header Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="text-xs sm:text-sm font-semibold text-slate-700">
              Showing <span className="text-slate-900 font-extrabold">{filteredProducts.length}</span> products
              {searchQuery && (
                <span className="text-slate-500 ml-1">
                  for query "<strong>{searchQuery}</strong>"
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
              >
                <option value="popularity">Popularity & Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  navigate={navigate}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your price range, category, or color filters to discover available stock.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow hover:bg-slate-800 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
