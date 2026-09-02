import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/store/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Minus, 
  Plus, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';

export const ProductDetailPage = ({ productId, navigate }) => {
  const product = INITIAL_PRODUCTS.find((p) => p.id === productId) || INITIAL_PRODUCTS[0];
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Crisp White');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes?.[0] || 'M');
    setSelectedColor(product.colors?.[0] || 'Crisp White');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const wishlisted = isWishlisted(product.id);

  const galleryImages = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    showToast(`Added ${quantity}x ${product.name} (${selectedSize} / ${selectedColor}) to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const relatedProducts = INITIAL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 font-medium">
        <span onClick={() => navigate('/')} className="cursor-pointer hover:text-slate-900 transition-colors">
          Home
        </span>
        <span>/</span>
        <span onClick={() => navigate('/products')} className="cursor-pointer hover:text-slate-900 transition-colors">
          {product.category}
        </span>
        <span>/</span>
        <span className="font-bold text-slate-900 truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Left: Studio Photograph Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Studio Photography
            </div>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                showToast(
                  wishlisted ? `Removed from Wishlist` : `Added to Wishlist!`,
                  wishlisted ? 'info' : 'success'
                );
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 flex items-center justify-center shadow-md transition-transform active:scale-90"
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImage === img
                      ? 'border-blue-600 ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Tag & Title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                {product.category} Department
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
                {product.name}
              </h1>
            </div>

            {/* Ratings & Stock */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">{product.reviewsCount} verified reviews</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                In Stock
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 py-3 border-y border-slate-100">
              <span className="font-heading font-extrabold text-3xl text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wider">
                    Selected Color:
                  </span>
                  <span className="font-semibold text-slate-600">{selectedColor}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white shadow'
                            : 'border-slate-200 hover:border-slate-400 text-slate-700 bg-slate-50'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wider">
                    Select Size:
                  </span>
                  <span className="text-blue-600 font-semibold text-xs cursor-pointer hover:underline">
                    Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-2 border-slate-900 bg-slate-900 text-white shadow-md'
                            : 'border border-slate-200 text-slate-700 hover:border-slate-900 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-4">
                {/* Stepper */}
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white font-bold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>

              {/* Direct Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>BUY / ORDER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Product Guarantees */}
          <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs text-slate-600 font-medium">
            <div className="flex items-center space-x-2 text-slate-800">
              <Check className="w-4 h-4 text-blue-600 shrink-0" />
              <span>100% Breathable Organic Cotton Fabric & Studio Craftsmanship</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-800">
              <Check className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Complimentary Express Shipping across India</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-800">
              <Check className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Instant Computer-Generated Official Sales Receipt</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      <div className="mt-14 space-y-6">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} navigate={navigate} />
          ))}
        </div>
      </div>

    </div>
  );
};
