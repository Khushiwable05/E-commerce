import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const OrderContext = createContext(null);

const ORDERS_STORAGE_KEY = 'omnidash_orders';

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from localStorage:', e);
    }
    // Default initial order matching Figma design
    const defaultItems = [
      {
        product: INITIAL_PRODUCTS[0],
        size: 'M',
        color: 'Crisp White',
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[1],
        size: '32',
        color: 'Indigo Blue',
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[2],
        size: '40mm',
        color: 'Classic Black',
        quantity: 1
      }
    ];

    const initialSubtotal = 1499 + 1899 + 3499; // 6897
    const initialTax = Math.round(initialSubtotal * 0.05); // 345
    const initialTotal = initialSubtotal + initialTax; // 7242

    return [
      {
        id: 'ORD-000001',
        receiptNo: 'REC-000001',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        dateTime: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        customer: {
          name: 'Khushi Wable',
          phone: '+91 98765 43210',
          email: 'khushi.wable@example.com',
          address: 'Flat 402, Sunshine Heights, M.G. Road',
          city: 'Pune',
          state: 'Maharashtra',
          pinCode: '411001'
        },
        items: defaultItems,
        subtotal: initialSubtotal,
        tax: initialTax,
        shipping: 0,
        total: initialTotal,
        status: 'Confirmed',
        receiptStatus: 'Generated'
      }
    ];
  });

  const [activeOrder, setActiveOrder] = useState(() => orders[0] || null);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage:', e);
    }
  }, [orders]);

  const createOrder = ({ customer, items, subtotal, tax, total }) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomNum}`;
    const receiptNo = `REC-${randomNum}`;
    const now = new Date();
    
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const formattedDateTime = now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const newOrder = {
      id: orderId,
      receiptNo,
      date: formattedDate,
      dateTime: formattedDateTime,
      customer,
      items,
      subtotal,
      tax,
      shipping: 0,
      total,
      status: 'Confirmed',
      receiptStatus: 'Generated'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    return newOrder;
  };

  const getOrderById = (id) => {
    if (!id) return null;
    return orders.find((o) => o.id === id || o.receiptNo === id) || null;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
