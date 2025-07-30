import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../components/ProductItem.jsx';

const Wishlist = () => {
  const { wishlist, products, removeFromWishlist } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const wishlistProducts = products.filter(p => wishlist.includes(p._id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#5f27cd] mb-8">My Wishlist</h1>
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-6xl mb-4">💔</span>
            <p className="text-lg text-gray-500">Your wishlist is empty. Start adding products you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <div key={product._id} className="relative group">
                <ProductItem
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
                <button
                  className="absolute top-3 left-3 bg-white/80 text-pink-500 rounded-full p-2 shadow hover:bg-pink-100 transition"
                  title="Remove from Wishlist"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <span role="img" aria-label="remove">💔</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
