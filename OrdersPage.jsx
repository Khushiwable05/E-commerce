import React from 'react';
import { useOrder } from '../context/OrderContext';
import { Package, Receipt, ArrowRight, Printer, CheckCircle2, ShoppingBag } from 'lucide-react';

export const OrdersPage = ({ navigate }) => {
  const { orders } = useOrder();

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center flex-1 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-900">
          No Orders Yet
        </h2>
        <p className="text-xs text-slate-500">
          When you place orders, your verified computer-generated sales receipts will appear here.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
      
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          My Orders & Verified Receipts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Track past orders and view or print official sales receipts.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5 hover:shadow-md transition-shadow"
          >
            {/* Top Row */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                  Order Reference
                </span>
                <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900 font-mono">
                  {order.id}
                </span>
                <span className="text-xs font-mono text-blue-600 font-bold ml-2">
                  ({order.receiptNo})
                </span>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <div className="text-right">
                  <span className="text-slate-400 font-medium block">Order Date</span>
                  <span className="font-bold text-slate-800">{order.dateTime || order.date}</span>
                </div>
                <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-extrabold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{order.status}</span>
                </span>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Purchased Items ({order.items?.length || 0})
                </span>
                <div className="space-y-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-xs">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt=""
                          className="w-10 h-12 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 line-clamp-1">{item.product?.name}</p>
                        <p className="text-slate-500 text-[11px]">
                          Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                        </p>
                      </div>
                      <span className="font-extrabold text-slate-900">
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Delivery Info & Total */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-3 text-xs">
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
                    Delivery Address
                  </span>
                  <p className="font-bold text-slate-900">{order.customer?.name}</p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pinCode}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">📞 {order.customer?.phone}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="font-bold text-slate-800">Total Invoice Amount:</span>
                  <span className="font-heading font-extrabold text-lg text-slate-900">
                    ₹{order.total?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => navigate(`/receipt/${order.id}`)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all flex items-center space-x-1.5"
              >
                <Receipt className="w-3.5 h-3.5 text-blue-400" />
                <span>View Official Sales Receipt</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
