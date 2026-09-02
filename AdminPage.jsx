import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminOverview } from '../components/admin/AdminOverview';
import { SalesReceipt } from '../components/store/SalesReceipt';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BILLBOARDS } from '../data/products';
import { useOrder } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Printer, 
  CheckCircle2, 
  X, 
  Package, 
  Layers, 
  Palette, 
  Image as ImageIcon 
} from 'lucide-react';

export const AdminPage = ({ navigate }) => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const { orders } = useOrder();
  const { showToast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Shirts',
    price: '',
    originalPrice: '',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please provide product title and price', 'error');
      return;
    }

    const created = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) * 1.5,
      rating: 5.0,
      reviewsCount: 1,
      image: newProduct.image,
      description: newProduct.description || 'Premium studio edition crafted with authentic fibers.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Crisp White', 'Black'],
      featured: true,
      archived: false,
      inStock: true
    };

    setProductsList((prev) => [created, ...prev]);
    setIsAddProductModalOpen(false);
    showToast(`Added product "${created.name}" successfully!`, 'success');
  };

  const handleDeleteProduct = (id) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen bg-slate-100">
      
      {/* Admin Sidebar Navigation */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setSelectedReceiptOrder(null);
          setCurrentTab(tab);
        }}
        onExitToStore={() => navigate('/')}
      />

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Receipt Modal if clicked */}
        {selectedReceiptOrder ? (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl space-y-4">
            <button
              onClick={() => setSelectedReceiptOrder(null)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 mb-2 flex items-center space-x-1"
            >
              <span>← Close Receipt View</span>
            </button>
            <SalesReceipt
              order={selectedReceiptOrder}
              onBack={() => setSelectedReceiptOrder(null)}
              navigate={navigate}
            />
          </div>
        ) : currentTab === 'overview' ? (
          <AdminOverview
            products={productsList}
            onSelectOrderReceipt={(order) => setSelectedReceiptOrder(order)}
            onAddNewProductClick={() => setIsAddProductModalOpen(true)}
          />
        ) : currentTab === 'products' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                  Product Management
                </h1>
                <p className="text-xs text-slate-500">
                  Manage live catalog inventory, descriptions, and studio photos
                </p>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase font-extrabold bg-slate-50/50">
                      <th className="py-3 px-3">Product</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">Rating</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {productsList.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-3 flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt=""
                            className="w-10 h-12 object-cover rounded-lg bg-slate-100 border border-slate-100"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {product.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-semibold">{product.category}</td>
                        <td className="py-3.5 px-3 font-extrabold text-slate-900 font-heading">
                          ₹{product.price.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-3 text-amber-500 font-bold">
                          ★ {product.rating} ({product.reviewsCount})
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            In Stock
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : currentTab === 'categories' ? (
          <div className="space-y-6">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                Department Categories
              </h1>
              <p className="text-xs text-slate-500">
                Manage navigation departments and billboard associations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
                    <img src={cat.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-heading font-bold text-base text-slate-900">{cat.name}</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {cat.productCount} Products
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Attached Billboard: {cat.billboardTitle}</p>
                </div>
              ))}
            </div>
          </div>
        ) : currentTab === 'billboards' ? (
          <div className="space-y-6">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                Storefront Hero Billboards
              </h1>
              <p className="text-xs text-slate-500">
                Featured promotional campaign banners displayed on storefront
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INITIAL_BILLBOARDS.map((b) => (
                <div key={b.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-3 p-5">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 relative">
                    <img src={b.imageUrl} alt="" className="w-full h-full object-cover opacity-80" />
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold bg-blue-600 text-white uppercase px-2 py-0.5 rounded shadow">
                      {b.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-slate-900">{b.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{b.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AdminOverview
            products={productsList}
            onSelectOrderReceipt={(order) => setSelectedReceiptOrder(order)}
            onAddNewProductClick={() => setIsAddProductModalOpen(true)}
          />
        )}

      </main>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">
                Add New Catalog Product
              </h2>
              <p className="text-xs text-slate-500">
                Create a new garment or accessory item for the live storefront
              </p>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Linen Relaxed Summer Shirt"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Shirts">Shirts</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Watches">Watches</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Bags">Bags</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1499"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Describe material, fit and craftsmanship..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md text-xs transition-all"
              >
                PUBLISH TO STORE
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
