import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'omnidash_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
    // Default initial items matching the high-fidelity Figma design
    const shirt = INITIAL_PRODUCTS[0];
    const jeans = INITIAL_PRODUCTS[1];
    return [
      {
        id: `${shirt.id}-M-Crisp White`,
        product: shirt,
        size: 'M',
        color: 'Crisp White',
        quantity: 1
      },
      {
        id: `${jeans.id}-32-Indigo Blue`,
        product: jeans,
        size: '32',
        color: 'Indigo Blue',
        quantity: 1
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const selectedColor = color || (product.colors && product.colors[0]) || 'Default';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          size: selectedSize,
          color: selectedColor,
          quantity
        }
      ];
    });
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return Math.round(subtotal * 0.05);
  }, [subtotal]);

  const shipping = 0; // Free express delivery

  const total = useMemo(() => {
    return subtotal + tax + shipping;
  }, [subtotal, tax, shipping]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        tax,
        shipping,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
