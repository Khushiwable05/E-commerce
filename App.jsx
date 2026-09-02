import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/common/Toast';
import { AuthModal } from './components/common/AuthModal';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ReceiptPage } from './pages/ReceiptPage';
import { LoginPage } from './pages/LoginPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path.startsWith('/products?search=')) {
      const query = decodeURIComponent(path.split('=')[1] || '');
      setSearchTerm(query);
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to extract route and query params
  const renderCurrentPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category') || 'All';
    const searchQueryParam = searchParams.get('search') || searchTerm;

    if (currentPath === '/' || currentPath === '/home') {
      return <HomePage navigate={navigate} />;
    }

    if (currentPath === '/products') {
      return (
        <ProductsPage
          navigate={navigate}
          initialCategory={categoryParam}
          initialSearch={searchQueryParam}
        />
      );
    }

    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.replace('/product/', '');
      return <ProductDetailPage productId={productId} navigate={navigate} />;
    }

    if (currentPath === '/cart') {
      return <CartPage navigate={navigate} />;
    }

    if (currentPath === '/checkout') {
      return <CheckoutPage navigate={navigate} />;
    }

    if (currentPath === '/confirmation') {
      return <ConfirmationPage navigate={navigate} />;
    }

    if (currentPath.startsWith('/receipt')) {
      const orderId = currentPath.replace('/receipt/', '').replace('/receipt', '');
      return <ReceiptPage orderId={orderId} navigate={navigate} />;
    }

    if (currentPath === '/login') {
      return <LoginPage navigate={navigate} />;
    }

    if (currentPath === '/orders') {
      return <OrdersPage navigate={navigate} />;
    }

    if (currentPath === '/admin') {
      return <AdminPage navigate={navigate} />;
    }

    // Default 404 Fallback
    return (
      <div className="max-w-2xl mx-auto p-12 text-center flex-1 space-y-4">
        <h2 className="font-heading font-extrabold text-3xl text-slate-900">404 - Page Not Found</h2>
        <p className="text-xs text-slate-500">The requested page does not exist in the OMNIDASH storefront.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
        >
          Return to Storefront
        </button>
      </div>
    );
  };

  const isAdminPage = currentPath === '/admin';

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
                
                {/* Navbar (Hidden inside standalone Admin view) */}
                {!isAdminPage && (
                  <Navbar
                    currentPath={currentPath}
                    navigate={navigate}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />
                )}

                {/* Main Page Body */}
                <main className="flex-1 flex flex-col">
                  {renderCurrentPage()}
                </main>

                {/* Footer (Hidden inside Admin view) */}
                {!isAdminPage && <Footer navigate={navigate} />}

                {/* Global Modals & Notifications */}
                <AuthModal />
                <ToastContainer />

              </div>
            </ToastProvider>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
