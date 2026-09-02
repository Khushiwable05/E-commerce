import React, { useState } from 'react';
import { ProductCard } from '../components/store/ProductCard';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/products';
import { 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Receipt, 
  RotateCcw, 
  ShieldCheck 
} from 'lucide-react';

export const HomePage = ({ navigate }) => {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'best-sellers' | 'trending'

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    if (filterTab === 'best-sellers') return p.rating >= 4.8;
    if (filterTab === 'trending') return p.reviewsCount > 90;
    return true;
  });

  return (
    <div className="flex-1">
      
      {/* 1. Large Hero Billboard Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85"
            alt="Summer Collection Editorial Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 flex flex-col justify-center">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-300 border border-white/10 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>New Season 2026</span>
              <span>•</span>
              <span>Studio Edition</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              SUMMER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
                COLLECTION
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
              Elevate your daily rotation with breathable organic cotton shirts, tailored denim, handcrafted leather sneakers, and timeless minimalist timepieces.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/products')}
                className="bg-white text-slate-950 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
              >
                Explore Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Curated Departments
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INITIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/products?category=${cat.name}`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {cat.productCount} Products
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Handpicked Selection
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Featured Products
            </h2>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTab === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilterTab('best-sellers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTab === 'best-sellers'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilterTab('trending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterTab === 'trending'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              navigate={navigate}
            />
          ))}
        </div>
      </section>

      {/* 4. Mid-Page Editorial Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
          <div className="absolute inset-0 z-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=80"
              alt="Leather Craftsmanship Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 p-8 sm:p-14 max-w-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Crafted With Precision
            </span>
            <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              Authentic Studio Quality
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every garment is engineered with high-density weave, reinforced seams, and sustainable organic natural fibers.
            </p>
            <div className="pt-3">
              <button
                onClick={() => navigate('/products')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg transition-all"
              >
                Discover Full Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Value Proposition Pillars */}
      <section className="border-y border-slate-200 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center space-x-3.5 p-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-slate-500">
                On all eligible orders above ₹999
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Verified Sales Receipts
              </h4>
              <p className="text-xs text-slate-500">
                Instant printable order invoices
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 shadow-sm">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                7-Day Easy Exchange
              </h4>
              <p className="text-xs text-slate-500">
                Hassle-free doorstep pickup
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                100% Authentic Products
              </h4>
              <p className="text-xs text-slate-500">
                Directly sourced studio stock
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
