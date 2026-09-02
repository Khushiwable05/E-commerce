"use client";

import React from "react";

interface AdminSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onSwitchToStore: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onNavigate,
  onSwitchToStore
}) => {
  const navItems = [
    { id: "overview", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "📦", badge: "12" },
    { id: "categories", label: "Categories", icon: "📑" },
    { id: "sizes-colors", label: "Sizes & Colors", icon: "🎨" },
    { id: "billboards", label: "Billboards", icon: "🖼️" },
    { id: "orders", label: "Orders", icon: "🛍️", badge: "3 New" },
    { id: "receipts", label: "Receipts Registry", icon: "🧾" },
    { id: "settings", label: "Store Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
      {/* Store Switcher */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            O
          </div>
          <span className="font-extrabold text-white text-lg">OMNIDASH</span>
          <span className="text-[10px] bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded font-bold uppercase">ADMIN</span>
        </div>

        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Active Store</label>
        <select className="w-full bg-slate-800 text-white text-xs font-semibold rounded-lg border border-slate-700 px-2.5 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none">
          <option value="main">Omnidash Main Store</option>
          <option value="outlet">Omnidash Luxury Outlet</option>
          <option value="new">+ Create New Store</option>
        </select>
      </div>

      {/* Nav List */}
      <nav className="p-3 space-y-1 flex-1 text-xs font-semibold">
        {navItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isActive ? "bg-blue-800 text-white" : "bg-slate-800 text-slate-300"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
        <button
          onClick={onSwitchToStore}
          className="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 py-2 rounded-xl font-bold flex items-center justify-center space-x-1.5"
        >
          <span>🛍️ Live Storefront</span>
        </button>
      </div>
    </aside>
  );
};