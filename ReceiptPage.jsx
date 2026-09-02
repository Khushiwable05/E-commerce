import React from 'react';
import { useOrder } from '../context/OrderContext';
import { SalesReceipt } from '../components/store/SalesReceipt';

export const ReceiptPage = ({ orderId, navigate }) => {
  const { getOrderById, activeOrder, orders } = useOrder();

  const order = (orderId ? getOrderById(orderId) : null) || activeOrder || orders[0];

  return (
    <div className="flex-1 py-4">
      <SalesReceipt 
        order={order} 
        onBack={() => navigate('/orders')} 
        navigate={navigate} 
      />
    </div>
  );
};
