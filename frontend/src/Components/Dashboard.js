import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiUser, FiCreditCard, FiSmartphone, FiTruck, FiCheck, FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orders, setOrders] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationOrder, setCelebrationOrder] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackOrder, setFeedbackOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const userIdentifier = user?.email || 'guest_user';
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem(`cart_${userIdentifier}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load orders from localStorage
    const savedOrders = localStorage.getItem(`orders_${userIdentifier}`);
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      
      // Check for newly delivered orders
      const deliveredOrders = parsedOrders.filter(order => 
        order.status === 'Delivered' && order.paymentStatus === 'Paid' && !order.feedbackGiven
      );
      
      if (deliveredOrders.length > 0 && !showCelebration) {
        setCelebrationOrder(deliveredOrders[0]);
        setShowCelebration(true);
      }
      
      setOrders(parsedOrders);
    }
  }, [user, showCelebration]);

  const updateCartQuantity = (itemId, change) => {
    setCart(prev => {
      const updated = prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0);
      
      const userIdentifier = user?.email || 'guest_user';
      localStorage.setItem(`cart_${userIdentifier}`, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      const userIdentifier = user?.email || 'guest_user';
      localStorage.setItem(`cart_${userIdentifier}`, JSON.stringify(updated));
      return updated;
    });
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const submitFeedback = () => {
    if (feedbackOrder) {
      const userIdentifier = user?.email || 'guest_user';
      const updatedOrders = orders.map(order => 
        order.id === feedbackOrder.id 
          ? { ...order, feedbackGiven: true, rating, feedback }
          : order
      );
      setOrders(updatedOrders);
      localStorage.setItem(`orders_${userIdentifier}`, JSON.stringify(updatedOrders));
    }
    setShowFeedback(false);
    setRating(0);
    setFeedback('');
    setFeedbackOrder(null);
  };

  const placeOrder = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    
    // Use fallback identifier if user email is not available
    const userIdentifier = user?.email || 'guest_user';
    console.log('Placing order for user:', userIdentifier);
    
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: getTotalAmount(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'Pending',
      paymentMethod: selectedPayment,
      paymentStatus: selectedPayment === 'Cash on Delivery' ? 'Pending' : 'Paid'
    };
    
    console.log('New order created:', newOrder);
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    
    const orderKey = `orders_${userIdentifier}`;
    console.log('Saving to localStorage with key:', orderKey);
    console.log('Orders to save:', updatedOrders);
    
    localStorage.setItem(orderKey, JSON.stringify(updatedOrders));
    
    // Verify it was saved
    const savedOrders = localStorage.getItem(orderKey);
    console.log('Verified saved orders:', JSON.parse(savedOrders));
    
    setCart([]);
    localStorage.removeItem(`cart_${userIdentifier}`);
    setShowCheckout(false);
    setSelectedPayment('');
    
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fed7aa 50%, #fecaca 75%, #ddd6fe 100%)'
    }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiUser className="text-3xl text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
          </div>
          <p className="text-gray-600">Manage your orders and cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Section */}
          <motion.div 
            className="morphism-card p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FiShoppingCart className="text-2xl text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Your Cart ({cart.length})</h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white/80 rounded-lg p-4 shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-8 h-8 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                        >
                          <FiMinus className="mx-auto" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-8 h-8 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
                        >
                          <FiPlus className="mx-auto" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-gray-800">₹{item.price * item.quantity}</div>
                        <div className="text-xs text-gray-500">₹{item.price} each</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">Total: ₹{getTotalAmount()}</span>
                  </div>
                  
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCreditCard />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Orders History */}
          <motion.div 
            className="morphism-card p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-600">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orders.map(order => {
                  const getStatusColor = (status) => {
                    switch (status) {
                      case 'Pending': return 'bg-yellow-100 text-yellow-800';
                      case 'Confirmed': return 'bg-blue-100 text-blue-800';
                      case 'Preparing': return 'bg-orange-100 text-orange-800';
                      case 'Ready': return 'bg-green-100 text-green-800';
                      case 'Delivered': return 'bg-gray-100 text-gray-800';
                      default: return 'bg-gray-100 text-gray-800';
                    }
                  };
                  
                  const orderSteps = [
                    { name: 'Order Placed', status: 'Pending' },
                    { name: 'Confirmed', status: 'Confirmed' },
                    { name: 'Preparing', status: 'Preparing' },
                    { name: 'Ready', status: 'Ready' },
                    { name: 'Delivered', status: 'Delivered' }
                  ];
                  
                  const getCurrentStepIndex = () => {
                    return orderSteps.findIndex(step => step.status === order.status);
                  };
                  
                  return (
                    <div key={order.id} className="bg-white/80 rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-gray-800">Order #{order.id}</div>
                          <div className="text-sm text-gray-600">{order.date} at {order.time}</div>
                          <div className="text-xs text-gray-500 mt-1">Payment: {order.paymentMethod}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      {/* Order Progress Tracker */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          {orderSteps.map((step, index) => {
                            const isCompleted = index <= getCurrentStepIndex();
                            const isActive = index === getCurrentStepIndex();
                            
                            return (
                              <div key={step.name} className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                  isCompleted 
                                    ? 'bg-green-500 text-white' 
                                    : isActive 
                                      ? 'bg-blue-500 text-white' 
                                      : 'bg-gray-300 text-gray-600'
                                }`}>
                                  {isCompleted ? <FiCheck /> : index + 1}
                                </div>
                                <div className={`text-xs mt-1 text-center ${
                                  isCompleted ? 'text-green-600 font-semibold' : 'text-gray-500'
                                }`}>
                                  {step.name}
                                </div>
                                {index < orderSteps.length - 1 && (
                                  <div className={`absolute h-0.5 w-16 mt-4 ${
                                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                  }`} style={{ left: `${(index + 1) * 20}%`, transform: 'translateX(-50%)' }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Celebration Modal */}
        {showCelebration && celebrationOrder && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Crackers Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1.5, 0], 
                      rotate: [0, 360],
                      y: [-20, -50, -20]
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {['🎉', '🎊', '✨', '🌟', '💫'][i % 5]}
                  </motion.div>
                ))}
              </div>
              
              <div className="relative z-10">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Completed!</h3>
                <p className="text-gray-600 mb-4">Your order #{celebrationOrder.id} has been delivered successfully!</p>
                <p className="text-sm text-gray-500 mb-6">Payment: {celebrationOrder.paymentMethod} - ₹{celebrationOrder.total}</p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setShowCelebration(false);
                      setCelebrationOrder(null);
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setShowCelebration(false);
                      setFeedbackOrder(celebrationOrder);
                      setShowFeedback(true);
                      setCelebrationOrder(null);
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedback && feedbackOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Rate Your Experience</h3>
              <p className="text-gray-600 mb-4 text-center">Order #{feedbackOrder.id}</p>
              
              {/* Star Rating */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-colors ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    <FiStar className={star <= rating ? 'fill-current' : ''} />
                  </button>
                ))}
              </div>
              
              {/* Feedback Text */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback about the food and service..."
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-24 resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowFeedback(false);
                    setRating(0);
                    setFeedback('');
                    setFeedbackOrder(null);
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition-colors"
                >
                  Skip
                </button>
                <button 
                  onClick={submitFeedback}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  disabled={rating === 0}
                >
                  Submit Feedback
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h3>
              
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
                <div className="space-y-2 mb-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{getTotalAmount()}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Select Payment Method</h4>
                <div className="space-y-3">
                  {/* UPI Payment */}
                  <div 
                    onClick={() => setSelectedPayment('UPI')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPayment === 'UPI' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FiSmartphone className="text-2xl text-blue-500" />
                      <div>
                        <div className="font-semibold text-gray-800">UPI Payment</div>
                        <div className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cash on Delivery */}
                  <div 
                    onClick={() => setSelectedPayment('Cash on Delivery')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPayment === 'Cash on Delivery' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FiTruck className="text-2xl text-green-500" />
                      <div>
                        <div className="font-semibold text-gray-800">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when your order arrives</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credit/Debit Card */}
                  <div 
                    onClick={() => setSelectedPayment('Card')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPayment === 'Card' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FiCreditCard className="text-2xl text-purple-500" />
                      <div>
                        <div className="font-semibold text-gray-800">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Net Banking */}
                  <div 
                    onClick={() => setSelectedPayment('Net Banking')}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPayment === 'Net Banking' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">₹</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Net Banking</div>
                        <div className="text-sm text-gray-600">All major banks supported</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowCheckout(false);
                    setSelectedPayment('');
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={placeOrder}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    selectedPayment 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!selectedPayment}
                >
                  Place Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;