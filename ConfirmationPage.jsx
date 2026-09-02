import React from 'react';
import { useOrder } from '../context/OrderContext';
import { CheckCircle2, Receipt, ArrowRight, Home, Package } from 'lucide-react';

export const ConfirmationPage = ({ navigate }) => {
  const { activeOrder, orders } = useOrder();
  const order = activeOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center flex-1 space-y-4">
        <h2 className="font-heading font-bold text-2xl text-slate-900">
          No Recent Order
        </h2>
        <p className="text-xs text-slate-500">
          You haven't placed an order recently.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-12 text-center space-y-6">
        
        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ Order Successfully Registered
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
            Your order has been recorded in the OMNIDASH database. An official sales receipt is generated and ready to print.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-200 space-y-4 text-xs">
          
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Order ID</span>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 font-mono">
                {order.id}
              </h3>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Date</span>
              <p className="font-bold text-slate-800">{order.date}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Status</span>
              <span className="inline-block text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer Summary */}
          <div className="space-y-1 text-slate-700 font-medium">
            <p><span className="font-bold text-slate-900">Customer:</span> {order.customer?.name}</p>
            <p><span className="font-bold text-slate-900">Phone:</span> {order.customer?.phone}</p>
            <p>
              <span className="font-bold text-slate-900">Shipping Address:</span>{' '}
              {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pinCode}
            </p>
          </div>

          {/* Items mini recap */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Ordered Products ({order.items?.length || 0})
            </span>
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-800">
                <div>
                  <span className="font-bold">{item.product?.name}</span>
                  <span className="text-slate-500 ml-2">
                    ({item.size} • {item.color}) x {item.quantity}
                  </span>
                </div>
                <span className="font-extrabold">
                  ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-sm font-bold text-slate-900">
            <span>Grand Total Paid:</span>
            <span className="font-heading font-extrabold text-xl text-blue-600">
              ₹{order.total?.toLocaleString('en-IN')}
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(`/receipt/${order.id}`)}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
          >
            <Receipt className="w-4 h-4 text-blue-400" />
            <span>GENERATE SALES RECEIPT</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Store</span>
          </button>
        </div>

      </div>
    </div>
  );
};
