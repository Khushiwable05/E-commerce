import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Palette, 
  Image as ImageIcon, 
  ShoppingBag, 
  Receipt, 
  Settings, 
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({ currentTab, onTabChange, onExitToStore }) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: '8' },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'sizes-colors', label: 'Sizes & Colors', icon: Palette },
    { id: 'billboards', label: 'Billboards', icon: ImageIcon },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: 'Live' },
    { id: 'receipts', label: 'Receipts Registry', icon: Receipt },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
      
      {/* Store Switcher */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-sm">
            O
          </div>
          <span className="font-heading font-extrabold text-white text-lg tracking-tight">OMNIDASH</span>
          <span className="text-[10px] bg-blue-900/80 text-blue-300 px-1.5 py-0.5 rounded font-extrabold uppercase border border-blue-700/50">
            ADMIN
          </span>
        </div>

        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
          Active Store Instance
        </label>
        <select className="w-full bg-slate-800 text-white text-xs font-semibold rounded-lg border border-slate-700 px-2.5 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none">
          <option value="main">Omnidash Main Store (Active)</option>
          <option value="outlet">Omnidash Luxury Outlet</option>
          <option value="new">+ Create New Store</option>
        </select>
      </div>

      {/* Nav List */}
      <nav className="p-3 space-y-1 flex-1 text-xs font-semibold">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                    isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
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
          onClick={onExitToStore}
          className="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 py-2.5 rounded-xl font-bold flex items-center justify-center space-x-1.5 border border-slate-700 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Live Storefront</span>
        </button>
        <div className="flex items-center justify-between text-slate-500 pt-1 text-[11px]">
          <span>Logged as: {user?.name || 'Administrator'}</span>
        </div>
      </div>

    </aside>
  );
};
