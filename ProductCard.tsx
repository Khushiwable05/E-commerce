"use client";

import React from "react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onViewProduct?: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onQuickAdd,
  onToggleWishlist
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-400 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Studio Photograph Container */}
      <div
        className="aspect-[4/5] w-full overflow-hidden bg-slate-100 relative cursor-pointer"
        onClick={() => onViewProduct?.(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Heart Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:text-rose-600 flex items-center justify-center shadow transition-transform active:scale-90"
          title="Save to Wishlist"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd?.(product);
            }}
            className="flex-1 bg-slate-900/95 hover:bg-slate-900 text-white py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur transition-all"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Information Block */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {product.category}
          </span>
          <h3
            className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
            onClick={() => onViewProduct?.(product)}
          >
            {product.name}
          </h3>
        </div>

        {/* Ratings */}
        <div className="flex items-center space-x-1.5 text-xs text-amber-500">
          <span>★★★★★</span>
          <span className="text-slate-500 font-semibold text-[11px]">({product.reviewsCount})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
          <div className="flex items-baseline space-x-2">
            <span className="font-extrabold text-base text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={() => onViewProduct?.(product)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            VIEW PRODUCT →
          </button>
        </div>
      </div>
    </div>
  );
};