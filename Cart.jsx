import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    products,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    currency
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartItems = cart.map(item => {
    const product = products.find(p => p._id === item.productId);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#5f27cd] mb-8">My Cart</h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-lg text-gray-500">Your cart is empty. Start shopping now!</p>
            <button
              className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow hover:scale-105 transition"
              onClick={() => navigate('/product')}
            >
              Shop Products
            </button>
          </div>
        ) : (
          <div className="bg-white/80 rounded-2xl shadow-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm">
                    <th className="py-2">Product</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id} className="border-b last:border-b-0">
                      <td className="flex items-center gap-3 py-3">
                        <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-contain rounded-lg shadow" />
                        <span className="font-semibold text-[#5f27cd]">{item.name}</span>
                      </td>
                      <td className="font-medium">{currency}{item.price}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 rounded bg-pink-100 text-pink-500 font-bold text-lg hover:bg-pink-200"
                            onClick={() => updateCartQuantity(item._id, Math.max(1, item.qty - 1))}
                          >-</button>
                          <span className="px-2 font-semibold">{item.qty}</span>
                          <button
                            className="px-2 py-1 rounded bg-pink-100 text-pink-500 font-bold text-lg hover:bg-pink-200"
                            onClick={() => updateCartQuantity(item._id, item.qty + 1)}
                          >+</button>
                        </div>
                      </td>
                      <td className="font-semibold">{currency}{item.price * item.qty}</td>
                      <td>
                        <button
                          className="text-red-500 hover:text-red-700 text-xl"
                          title="Remove from cart"
                          onClick={() => removeFromCart(item._id)}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <div className="text-xl font-bold text-[#5f27cd]">
                Total: {currency}{getCartTotal()}
              </div>
              <button
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow hover:scale-105 transition"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
