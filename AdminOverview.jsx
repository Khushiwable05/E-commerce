import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Image as ImageIcon, 
  Eye, 
  Printer, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';

export const AdminOverview = ({ products, onSelectOrderReceipt, onAddNewProductClick }) => {
  const { orders } = useOrder();
  const { showToast } = useToast();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics and management for <strong className="text-slate-800">Omnidash Main Store</strong>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddNewProductClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
            <span>↑ 18.4%</span>
            <span className="text-slate-400 font-normal">from last cycle</span>
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            +{totalOrdersCount}
          </div>
          <p className="text-[11px] text-blue-600 font-bold flex items-center space-x-1">
            <span>Verified receipts generated</span>
          </p>
        </div>

        {/* Products in Stock */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products Active</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {products.length}
          </div>
          <p className="text-[11px] text-purple-600 font-bold">
            All categories in stock
          </p>
        </div>

        {/* Active Billboards */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hero Billboards</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            2
          </div>
          <p className="text-[11px] text-amber-600 font-bold">
            Summer Collection Active
          </p>
        </div>

      </div>

      {/* Recent Orders Registry Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Orders & Verified Sales Receipts Registry
            </h3>
            <p className="text-xs text-slate-500">
              Live orders placed through the customer storefront
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {orders.length} Active Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold bg-slate-50/50">
                <th className="py-3 px-3">Order ID / Receipt</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Items Count</th>
                <th className="py-3 px-3 text-right">Total Value</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-extrabold text-slate-900 block font-mono">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-blue-600 font-mono">
                      {order.receiptNo}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">
                      {order.customer?.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {order.customer?.phone}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-800">
                      {order.items?.reduce((s, i) => s + i.quantity, 0) || 1} items
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-extrabold text-slate-900 font-heading">
                    ₹{order.total?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center space-x-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{order.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => onSelectOrderReceipt(order)}
                      className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                    >
                      <Eye className="w-3 h-3 text-blue-400" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
