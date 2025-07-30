import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, products, getCartTotal, currency } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [error, setError] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const cartItems = cart.map(item => {
    const product = products.find(p => p._id === item.productId);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.address || !form.city || !form.zip || !form.country) {
      setError('Please fill in all fields.');
      return;
    }
    // Normally, send order to backend here
    navigate('/order_placed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-[#5f27cd] mb-4">Checkout</h1>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.address}
            onChange={handleChange}
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 flex-1"
              value={form.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 flex-1"
              value={form.zip}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.country}
            onChange={handleChange}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            Place Order
          </button>
        </form>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#5f27cd] mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center justify-between bg-white rounded-lg shadow p-3">
                  <div className="flex items-center gap-3">
                    <img src={item.image[0]} alt={item.name} className="w-12 h-12 object-contain rounded" />
                    <span className="font-semibold text-[#5f27cd]">{item.name}</span>
                  </div>
                  <div className="font-semibold">{currency}{item.price} × {item.qty}</div>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-6">
                <span>Total:</span>
                <span>{currency}{getCartTotal()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout; 