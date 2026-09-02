"use client";

import React from "react";
import { Order } from "../../types";

interface SalesReceiptProps {
  order: Order;
  onPrint?: () => void;
  onDownload?: () => void;
}

export const SalesReceipt: React.FC<SalesReceiptProps> = ({
  order,
  onPrint = () => window.print(),
  onDownload
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      {/* Action Bar (Hidden on Print) */}
      <div className="flex justify-between items-center mb-6 no-print">
        <span className="text-xs font-semibold text-slate-500">Official Computer-Generated Receipt</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={onPrint}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center space-x-2"
          >
            <span>🖨️ PRINT RECEIPT</span>
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center space-x-2"
            >
              <span>📥 DOWNLOAD PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Printable Receipt Paper Container */}
      <div id="printable-receipt-area" className="bg-white rounded-3xl border border-slate-300 shadow-xl p-8 sm:p-12 text-slate-900 font-sans">
        {/* Header Block */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">OMNIDASH</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">E-Commerce Store</p>
            <p className="text-xs text-slate-500 mt-1">104 Innovation Hub, MG Road, Pune, MH 411001</p>
            <p className="text-xs text-slate-500">Support: contact@omnidash.store | +91 98765 43210</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-slate-900 text-white text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded">
              SALES RECEIPT
            </span>
            <p className="text-xs font-mono font-bold text-slate-800 mt-2">Receipt No: {order.receiptNo}</p>
            <p className="text-xs font-mono text-slate-600">Order ID: {order.id}</p>
            <p className="text-xs text-slate-600">Date: {order.date}</p>
          </div>
        </div>

        {/* Customer Information Block */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs space-y-1">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Billed & Shipped To:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
            <div>
              <p><span className="font-semibold text-slate-900">Name:</span> {order.customer.name}</p>
              <p><span className="font-semibold text-slate-900">Phone:</span> {order.customer.phone}</p>
            </div>
            <div>
              <p><span className="font-semibold text-slate-900">Address:</span></p>
              <p className="text-slate-600">{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pinCode}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-900 uppercase tracking-wider font-extrabold">
                <th className="py-2.5">Product</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Price</th>
                <th className="py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3">
                    <span className="font-bold text-slate-900">{item.product.name}</span>
                    <span className="block text-[11px] text-slate-500">Size: {item.size} | Color: {item.color}</span>
                  </td>
                  <td className="py-3 text-center font-medium">{item.quantity}</td>
                  <td className="py-3 text-right">₹{item.product.price.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-right font-bold">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="border-t-2 border-slate-900 pt-4 mb-8">
          <div className="w-full sm:w-1/2 ml-auto space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%):</span>
              <span className="font-semibold text-slate-900">₹{order.tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-300 text-sm font-extrabold text-slate-900">
              <span>TOTAL:</span>
              <span className="text-lg">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer (Strictly No Payment Method Required) */}
        <div className="text-center border-t border-slate-200 pt-6 space-y-1.5">
          <p className="font-bold text-sm text-slate-900">Thank you for shopping with OMNIDASH!</p>
          <p className="text-[11px] text-slate-500">This is an official computer-generated sales order receipt. No signature required.</p>
          <p className="text-[10px] text-slate-400 font-mono pt-2">OMNIDASH STORE RECEIPT ID: {order.receiptNo} • VERIFIED</p>
        </div>
      </div>
    </div>
  );
};