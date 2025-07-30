import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockOrder = {
  id: 'ORD12347',
  date: '2024-06-05',
  total: 210,
  status: 'Placed',
};

const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center">
        <div className="text-7xl mb-4 text-green-400">✔️</div>
        <h1 className="text-3xl font-bold text-[#5f27cd] mb-2 text-center">Thank you for your order!</h1>
        <p className="text-gray-600 mb-6 text-center">Your order has been placed successfully. We appreciate your purchase!</p>
        <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID:</span>
            <span>{mockOrder.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Date:</span>
            <span>{mockOrder.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total:</span>
            <span>${mockOrder.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className="text-green-600 font-bold">{mockOrder.status}</span>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow hover:scale-105 transition"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
          <button
            className="flex-1 py-2 rounded-lg border border-pink-400 text-pink-500 font-bold shadow hover:bg-pink-50 transition"
            onClick={() => navigate('/orders')}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
