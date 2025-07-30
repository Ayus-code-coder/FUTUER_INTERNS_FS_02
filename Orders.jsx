import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const mockOrders = [
  {
    id: 'ORD12345',
    date: '2024-06-01',
    total: 320,
    status: 'Delivered',
  },
  {
    id: 'ORD12346',
    date: '2024-05-20',
    total: 150,
    status: 'Shipped',
  },
  {
    id: 'ORD12347',
    date: '2024-06-05',
    total: 210,
    status: 'Placed',
  },
];

const Orders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#5f27cd] mb-8">My Orders</h1>
        {mockOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-6xl mb-4">📦</span>
            <p className="text-lg text-gray-500">You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className="text-gray-500 text-sm">{order.date}</div>
                </div>
                <div className="flex items-center gap-6 mt-2 sm:mt-0">
                  <div className="font-bold text-[#5f27cd]">${order.total}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
