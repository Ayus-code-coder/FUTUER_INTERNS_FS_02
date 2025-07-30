import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductItem from '../components/ProductItem.jsx';
import Modal from '../components/Modal.jsx';

const categories = ['Men', 'Women', 'Kids'];
const sortOptions = [
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
];

const Product = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Handle category filter toggle
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter products by selected categories
  let filteredProducts = selectedCategories.length
    ? products.filter((p) => selectedCategories.includes(p.category))
    : products;

  // Sort products
  if (sortOrder === 'asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t min-h-screen bg-white">
      {/* Filter Sidebar */}
      <div className="min-w-60 mb-6 sm:mb-0">
        <div
          className="my-2 text-xl flex items-center cursor-pointer gap-2 select-none"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          <span className="text-base">{showFilter ? '▲' : '▼'}</span>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 mt-2 ${showFilter ? '' : 'hidden'} bg-gray-50 rounded-lg`}>  
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((cat) => (
              <label key={cat} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3 accent-pink-600"
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">SORT BY</p>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default</option>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className="relative group">
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
                {/* Quick View Button */}
                <button
                  className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-1 rounded-full shadow-lg font-semibold text-xs z-10"
                  onClick={() => setQuickViewProduct(item)}
                >
                  Quick View
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
      {/* Quick View Modal */}
      <Modal isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)}>
        {quickViewProduct && (
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={quickViewProduct.image[0]}
              alt={quickViewProduct.name}
              className="w-40 h-40 object-contain rounded-xl shadow-md mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-[#5f27cd]">{quickViewProduct.name}</h2>
              <p className="text-lg font-semibold mb-2 text-[#22223b]">${quickViewProduct.price}</p>
              <p className="text-gray-600 mb-3 text-sm">{quickViewProduct.description}</p>
              <div className="mb-3">
                <span className="font-medium text-sm">Sizes: </span>
                {quickViewProduct.sizes.map((size) => (
                  <span key={size} className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs mr-2">
                    {size}
                  </span>
                ))}
              </div>
              <button className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Product;
