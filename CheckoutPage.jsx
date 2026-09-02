import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';
import { Check, ArrowLeft, ShieldCheck, ArrowRight, User, Phone, Mail, MapPin } from 'lucide-react';

export const CheckoutPage = ({ navigate }) => {
  const { cartItems, subtotal, tax, total, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || 'Khushi Wable',
    phone: '+91 98765 43210',
    email: user?.email || 'khushi.wable@example.com',
    address: 'Flat 402, Sunshine Heights, M.G. Road',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: '411001'
  });

  const [error, setError] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center flex-1 space-y-4">
        <h2 className="font-heading font-bold text-2xl text-slate-900">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-slate-500">
          Please add items to your shopping cart before creating an order.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pinCode.trim()) {
      setError('Please fill out all mandatory customer delivery information.');
      return;
    }

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    const newOrder = createOrder({
      customer: formData,
      items: cartItems,
      subtotal,
      tax,
      total
    });

    clearCart();
    showToast(`Order ${newOrder.id} created successfully!`, 'success');
    navigate('/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-xl mx-auto mb-8 text-xs font-bold">
        <div 
          onClick={() => navigate('/cart')}
          className="flex items-center space-x-2 text-emerald-600 cursor-pointer"
        >
          <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            ✓
          </span>
          <span>Cart</span>
        </div>
        <div className="w-12 sm:w-20 h-0.5 bg-emerald-300" />
        <div className="flex items-center space-x-2 text-blue-600">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
            2
          </span>
          <span>Customer Information</span>
        </div>
        <div className="w-12 sm:w-20 h-0.5 bg-slate-200" />
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
            3
          </span>
          <span>Order Receipt</span>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900">
            Customer Delivery Information
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Please provide delivery details for official sales order receipt generation.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
              Email Address (Optional)
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
              Street Address *
            </label>
            <div className="relative">
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Flat / Building / Street"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                State *
              </label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Postal / PIN Code *
              </label>
              <input
                type="text"
                name="pinCode"
                required
                value={formData.pinCode}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Order Summary Total Preview */}
          <div className="pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between text-sm">
              <div>
                <span className="font-bold text-slate-800">Total Order Amount:</span>
                <span className="text-xs text-slate-500 ml-2 font-medium">(Includes 5% Tax)</span>
              </div>
              <span className="font-heading font-extrabold text-xl text-slate-900">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>CONFIRM ORDER</span>
              <Check className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
