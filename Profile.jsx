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
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#5f27cd] mb-8">My Profile</h1>
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-3xl text-white font-bold">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="text-xl font-semibold text-[#5f27cd]">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
            </div>
          </div>
          {/* Edit profile button (placeholder) */}
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold shadow hover:scale-105 transition">
            Edit Profile
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#5f27cd] mb-4">Recent Orders</h2>
          {mockOrders.length === 0 ? (
            <div className="text-gray-500">No orders yet.</div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-semibold">Order #{order.id}</div>
                    <div className="text-gray-500 text-sm">{order.date}</div>
                  </div>
                  <div className="flex items-center gap-6 mt-2 sm:mt-0">
                    <div className="font-bold text-[#5f27cd]">${order.total}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
