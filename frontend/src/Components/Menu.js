import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiStar, FiShoppingCart } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { menuItems } from './MenuData';

const Menu = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [budgetRange, setBudgetRange] = useState('All');
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  React.useEffect(() => {
    const userIdentifier = user?.email || 'guest_user';
    const savedCart = localStorage.getItem(`cart_${userIdentifier}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fed7aa 50%, #fecaca 75%, #ddd6fe 100%)'
      }}>
        <div className="text-center max-w-md mx-auto">
          <motion.div
            className="morphism-card p-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to access our restaurant menu and place orders.</p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const categories = ['All', 'Dal & Sabji', 'Paneer Special', 'Indian Breads', 'Salad/Raita', 'Happy Meals', 'Rice Dishes', 'Desserts', 'Hot Sips', 'Milk/Shakes', 'Beat The Heat', 'Chaat Bhandar', 'Tava Paratha', 'Chinese', 'Pizza/Pasta/Sides', 'Burger & Wraps', 'Toast & Sandwich', 'South Indian'];
  const budgetRanges = ['All', '₹50-150', '₹150-300', '₹300-500', '₹500+'];

  const getBudgetFilter = (price) => {
    if (price <= 150) return '₹50-150';
    if (price <= 300) return '₹150-300';
    if (price <= 500) return '₹300-500';
    return '₹500+';
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const budgetMatch = budgetRange === 'All' || getBudgetFilter(item.price) === budgetRange;
    return categoryMatch && budgetMatch;
  });

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity }];
    }
    
    setCart(updatedCart);
    // Save to localStorage for the specific user
    const userIdentifier = user?.email || 'guest_user';
    localStorage.setItem(`cart_${userIdentifier}`, JSON.stringify(updatedCart));
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fed7aa 50%, #fecaca 75%, #ddd6fe 100%)'
    }}>
      {/* Colorful Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-400/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-60 h-60 bg-blue-400/40 rounded-full blur-3xl" />
      </div>
      
      {/* Cartoon Food Characters */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-32 left-20 text-8xl transform rotate-12">😄</div>
        <div className="absolute top-64 right-32 text-6xl transform -rotate-12">🍕</div>
        <div className="absolute bottom-40 left-16 text-7xl transform rotate-45">🍜</div>
        <div className="absolute bottom-60 right-20 text-5xl transform -rotate-45">🥘</div>
        <div className="absolute top-96 left-1/2 text-6xl transform rotate-12">🍲</div>
        <div className="absolute bottom-32 left-1/3 text-8xl transform -rotate-12">🥗</div>
        <div className="absolute top-48 right-1/4 text-7xl transform rotate-45">🍝</div>
        <div className="absolute bottom-80 right-1/3 text-6xl transform -rotate-45">🍛</div>
        <div className="absolute top-80 left-40 text-5xl transform rotate-30">😋</div>
        <div className="absolute bottom-96 right-40 text-6xl transform -rotate-30">🤩</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm font-medium text-gray-700 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HiSparkles className="text-orange-500" />
            Indian Lounge Menu
          </motion.div>
          
          <motion.h1 
            className="text-primary-heading mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Authentic
            <span className="text-neon block">Indian Cuisine</span>
          </motion.h1>
          
          <motion.div
            className="flex justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/dashboard">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2">
                <FiShoppingCart /> 
                My Dashboard ({cart.length})
              </button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-primary-text max-w-3xl mx-auto text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our carefully crafted menu featuring traditional Indian dishes 
            made with authentic spices and fresh ingredients.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="morphism-card p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <FiFilter className="text-gray-700" />
                <span className="text-gray-700 font-semibold">Filters</span>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-gray-600 text-sm font-medium mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-3">Budget Range</label>
                <div className="space-y-2">
                  {budgetRanges.map(range => (
                    <motion.button
                      key={range}
                      onClick={() => setBudgetRange(range)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        budgetRange === range
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {range}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Menu Items */}
          <motion.div 
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Dense Floating Food Items & Cartoons Throughout Grid */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {/* Food Cards */}
              {[...Array(80)].map((_, i) => {
                const foods = [
                  { emoji: '🥘', name: 'Paneer Tikka', price: 250 },
                  { emoji: '🍛', name: 'Dal Makhani', price: 180 },
                  { emoji: '🍜', name: 'Hakka Noodles', price: 220 },
                  { emoji: '🍲', name: 'Veg Biryani', price: 280 },
                  { emoji: '🍰', name: 'Gulab Jamun', price: 120 },
                  { emoji: '🥖', name: 'Butter Naan', price: 80 },
                  { emoji: '🥗', name: 'Samosa', price: 60 },
                  { emoji: '🥥', name: 'Masala Dosa', price: 180 },
                  { emoji: '🍕', name: 'Pizza', price: 200 },
                  { emoji: '🍚', name: 'Rice Bowl', price: 150 },
                  { emoji: '🍝', name: 'Pasta', price: 170 },
                  { emoji: '🧀', name: 'Cheese', price: 90 },
                  { emoji: '🍳', name: 'Egg Curry', price: 140 },
                  { emoji: '🥘', name: 'Pakora', price: 80 },
                  { emoji: '🍛', name: 'Rajma', price: 160 },
                  { emoji: '🍜', name: 'Chowmein', price: 200 },
                  { emoji: '🍲', name: 'Pulao', price: 220 },
                  { emoji: '🍰', name: 'Cake', price: 150 },
                  { emoji: '🥖', name: 'Roti', price: 60 },
                  { emoji: '🥗', name: 'Aloo Tikki', price: 70 }
                ];
                const food = foods[i % foods.length];
                const row = Math.floor(i / 8);
                const col = i % 8;
                const topPos = 8 + (row * 12);
                const leftPos = 2 + (col * 12);
                return (
                  <motion.div
                    key={`food-${i}`}
                    className="absolute"
                    style={{ 
                      top: `${topPos}%`, 
                      left: `${leftPos}%`
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 0.4, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.03 }}
                  >
                    <div className="text-center bg-white/95 rounded-2xl p-2 shadow-lg transform hover:scale-110 transition-transform">
                      <div className="text-2xl mb-1">{food.emoji}</div>
                      <div className="text-xs font-semibold text-gray-800 whitespace-nowrap">{food.name}</div>
                      <div className="text-xs text-orange-600 font-bold">₹{food.price}</div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Cartoon Stickers */}
              {[...Array(60)].map((_, i) => {
                const cartoons = ['😋', '🤩', '😄', '😍', '😁', '😊', '🤤', '😎', '🥰', '😂', '😘', '😜', '🤪', '😌', '😉'];
                const cartoon = cartoons[i % cartoons.length];
                const row = Math.floor(i / 10);
                const col = i % 10;
                const topPos = 5 + (row * 15) + Math.random() * 8;
                const leftPos = 5 + (col * 9) + Math.random() * 6;
                return (
                  <motion.div
                    key={`cartoon-${i}`}
                    className="absolute text-4xl"
                    style={{ 
                      top: `${topPos}%`, 
                      left: `${leftPos}%`,
                      transform: `rotate(${Math.random() * 60 - 30}deg)`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.02 }}
                  >
                    {cartoon}
                  </motion.div>
                );
              })}
              
              {/* Fun Text Stickers */}
              {['YUM!', 'TASTY!', 'WOW!', 'SPICY!', 'HOT!', 'FRESH!', 'DELICIOUS!', 'CRISPY!'].map((text, i) => (
                <motion.div
                  key={`text-${i}`}
                  className="absolute text-2xl font-bold text-orange-500/30"
                  style={{ 
                    top: `${15 + i * 12}%`, 
                    right: `${5 + (i % 3) * 15}%`,
                    transform: `rotate(${Math.random() * 40 - 20}deg)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10" style={{ gridAutoFlow: 'dense' }}>
              {categories.filter(cat => cat !== 'All').map(category => {
                const categoryItems = filteredItems.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;
                
                return (
                  <motion.div
                    key={category}
                    className={`p-4 relative overflow-hidden h-fit rounded-3xl shadow-xl ${
                      category.includes('Dal') ? 'bg-gradient-to-br from-red-500 to-red-600' :
                      category.includes('Paneer') ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      category.includes('Chinese') ? 'bg-gradient-to-br from-red-400 to-pink-500' :
                      category.includes('South Indian') ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      category.includes('Happy') ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                      category.includes('Rice') ? 'bg-gradient-to-br from-green-400 to-green-500' :
                      category.includes('Desserts') ? 'bg-gradient-to-br from-gray-700 to-gray-800' :
                      category.includes('Bread') ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      category.includes('Pizza') ? 'bg-gradient-to-br from-green-400 to-teal-500' :
                      category.includes('Toast') ? 'bg-gradient-to-br from-pink-500 to-red-500' :
                      category.includes('Chaat') ? 'bg-gradient-to-br from-red-400 to-orange-500' :
                      'bg-gradient-to-br from-orange-500 to-red-500'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Background Images and Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <div className="text-6xl font-bold text-orange-300 transform rotate-12 select-none">
                        Delicious
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-end justify-start pointer-events-none opacity-5 p-4">
                      <div className="text-4xl font-bold text-green-300 transform -rotate-12 select-none">
                        Dishes
                      </div>
                    </div>
                    
                    {/* Food Emojis in vacant spaces */}
                    <div className="absolute top-4 right-4 text-3xl opacity-10 pointer-events-none transform rotate-12">🍽️</div>
                    <div className="absolute bottom-4 left-4 text-2xl opacity-10 pointer-events-none transform -rotate-12">👨‍🍳</div>
                    <div className="absolute top-1/2 right-2 text-2xl opacity-10 pointer-events-none transform rotate-45">🥄</div>
                    
                    {/* Additional food icons based on category */}
                    {category.includes('Dal') && <div className="absolute top-8 left-8 text-2xl opacity-10 pointer-events-none">🍛</div>}
                    {category.includes('Paneer') && <div className="absolute bottom-8 right-8 text-2xl opacity-10 pointer-events-none">🧀</div>}
                    {category.includes('Chinese') && <div className="absolute top-12 right-12 text-2xl opacity-10 pointer-events-none">🥢</div>}
                    {category.includes('South Indian') && <div className="absolute bottom-12 left-12 text-2xl opacity-10 pointer-events-none">🥥</div>}
                    {category.includes('Desserts') && <div className="absolute top-16 left-16 text-2xl opacity-10 pointer-events-none">🍰</div>}
                    {category.includes('Beverages') && <div className="absolute bottom-16 right-16 text-2xl opacity-10 pointer-events-none">☕</div>}
                    
                    {/* Cartoon Characters and Fun Elements */}
                    <div className="absolute top-2 right-2 text-4xl opacity-30 pointer-events-none transform rotate-12">
                      {category.includes('Dal') ? '😋' :
                       category.includes('Paneer') ? '🤩' :
                       category.includes('Chinese') ? '😄' :
                       category.includes('South Indian') ? '😍' :
                       category.includes('Happy') ? '😁' :
                       category.includes('Rice') ? '😊' :
                       category.includes('Desserts') ? '🤤' :
                       '😋'}
                    </div>
                    
                    {/* Fun Background Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                      <div className="text-5xl font-bold text-white transform rotate-12 select-none">
                        {category.includes('Happy') ? 'YUM!' :
                         category.includes('Chinese') ? 'WOK!' :
                         category.includes('Desserts') ? 'SWEET!' :
                         'TASTY!'}
                      </div>
                    </div>
                    
                    {/* Food illustrations */}
                    <div className="absolute bottom-2 left-2 text-3xl opacity-20 pointer-events-none transform -rotate-12">
                      {category.includes('Dal') ? '🍛' :
                       category.includes('Paneer') ? '🧀' :
                       category.includes('Chinese') ? '🥢' :
                       category.includes('South Indian') ? '🥥' :
                       category.includes('Rice') ? '🍚' :
                       category.includes('Desserts') ? '🍰' :
                       category.includes('Bread') ? '🥖' :
                       '🍽️'}
                    </div>
                    
                    <div className="relative z-10">
                      <h2 className="text-lg font-bold text-white mb-3 border-b border-white/30 pb-2 drop-shadow-lg">
                        {category}
                      </h2>
                      
                      <div className="space-y-2">
                        {categoryItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative z-20"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-gray-900 font-semibold text-sm">{item.name}</h3>
                              {item.isVeg && (
                                <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                              )}
                              <div className="text-xs text-white bg-red-500 px-1.5 py-0.5 rounded-full font-medium">
                                {item.spiceLevel}
                              </div>
                            </div>
                            <p className="text-gray-700 text-xs mb-1 line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1">
                                <span className="text-green-700 font-bold text-sm">₹</span>
                                <span className="text-gray-900 font-bold text-sm">
                                  {item.price * (quantities[item.id] || 1)}
                                </span>
                                {quantities[item.id] > 1 && (
                                  <span className="text-xs text-gray-500">(₹{item.price} each)</span>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <FiStar className="text-yellow-500 text-xs" />
                                <span className="text-gray-500 text-xs">{item.rating}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 transition-colors"
                                  disabled={!quantities[item.id]}
                                >
                                  -
                                </button>
                                <span className="text-sm font-semibold min-w-[20px] text-center">
                                  {quantities[item.id] || 1}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => addToCart(item)}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-semibold transition-colors"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              

            </div>
          </motion.div>
        </div>

        {filteredItems.length === 0 && (
          <div className="lg:col-span-4 text-center py-12">
            <p className="text-xl text-gray-600">No items found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;