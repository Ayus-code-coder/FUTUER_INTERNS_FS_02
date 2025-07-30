import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const mockOrders = [
  {
    id: 'ORD12345',
    date: '2024-06-01',
    total: 320,
    status: 'Delivered',
    shipping: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zip: '10001',
      country: 'USA',
    },
    items: [
      { name: 'Men T-shirt', image: require('../assets/p_img2_1.png'), qty: 2, price: 100 },
      { name: 'Women Top', image: require('../assets/p_img1.png'), qty: 1, price: 120 },
    ],
  },
  {
    id: 'ORD12346',
    date: '2024-05-20',
    total: 150,
    status: 'Shipped',
    shipping: {
      name: 'Jane Smith',
      address: '456 Park Ave',
      city: 'Los Angeles',
      zip: '90001',
      country: 'USA',
    },
    items: [
      { name: 'Kids Top', image: require('../assets/p_img3.png'), qty: 3, price: 50 },
    ],
  },
];

const OrderDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { orderId } = useParams();

  if (!user) {
    navigate('/login');
    return null;
  }

  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-indigo-50">
        <div className="bg-white/90 rounded-2xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center">
          <div className="text-6xl mb-4 text-red-400">❌</div>
          <h1 className="text-2xl font-bold text-[#5f27cd] mb-2 text-center">Order Not Found</h1>
          <button
            className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow hover:scale-105 transition"
            onClick={() => navigate('/orders')}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#5f27cd] mb-6">Order Details</h1>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Date:</span>
            <span>{order.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Status:</span>
            <span className={`font-bold ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-yellow-600' : 'text-blue-600'}`}>{order.status}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total:</span>
            <span>${order.total}</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#5f27cd] mb-2">Shipping Info</h2>
          <div className="text-gray-700">
            <div>{order.shipping.name}</div>
            <div>{order.shipping.address}, {order.shipping.city}</div>
            <div>{order.shipping.zip}, {order.shipping.country}</div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#5f27cd] mb-2">Items</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white rounded-lg shadow p-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-[#5f27cd]">{item.name}</div>
                  <div className="text-gray-500 text-sm">Qty: {item.qty}</div>
                </div>
                <div className="font-semibold">${item.price * item.qty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 