import React from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/store/CartItem';
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CartPage = ({ navigate }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, tax, total, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center flex-1 space-y-5">
        <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h2 className="font-heading font-extrabold text-2xl text-slate-900">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Discover our curated collection of organic cotton shirts, selvedge denim, footwear, and chronographs.
          </p>
        </div>
        <div className="pt-3">
          <button
            onClick={() => navigate('/products')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <span>DISCOVER PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Your Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review selected items before generating your verified order sales receipt.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              navigate={navigate}
            />
          ))}

          <div className="pt-3">
            <button
              onClick={() => navigate('/products')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right Col: Order Summary & Checkout */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm font-medium">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-slate-900 font-heading">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST / Tax (5% Included)</span>
                <span className="font-bold text-slate-900 font-heading">
                  ₹{tax.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Express Delivery</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-bold text-base text-slate-900">Grand Total</span>
                <span className="font-heading font-extrabold text-2xl text-slate-900">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Free Delivery Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-800 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You've unlocked Free Express Delivery!</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Orders placed today dispatch same-day with real-time tracking.
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>CREATE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/products')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs transition-all"
              >
                CONTINUE SHOPPING
              </button>
            </div>

            {/* Direct Flow Notice */}
            <p className="text-[11px] text-slate-400 text-center font-medium flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Direct Order Flow • Instant Verified Receipt</span>
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};
