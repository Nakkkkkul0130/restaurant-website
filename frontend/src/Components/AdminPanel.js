import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiDollarSign, FiCheck, FiX, FiClock, FiTruck, FiEye, FiLock, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadAllOrders();
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadAllOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadAllOrders = () => {
    // Get all orders from all users
    const orders = [];
    console.log('Loading orders from localStorage...');
    console.log('Total localStorage items:', localStorage.length);
    
    // Debug: Show all localStorage keys
    const allKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      allKeys.push(localStorage.key(i));
    }
    console.log('All localStorage keys:', allKeys);
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log('Checking key:', key);
      
      if (key && key.startsWith('orders_')) {
        console.log('Found orders key:', key);
        try {
          const userOrders = JSON.parse(localStorage.getItem(key));
          const userEmail = key.replace('orders_', '');
          console.log('User orders for', userEmail, ':', userOrders);
          
          if (Array.isArray(userOrders)) {
            userOrders.forEach(order => {
              orders.push({ ...order, userEmail });
            });
          }
        } catch (error) {
          console.error('Error parsing orders for key:', key, error);
        }
      }
    }
    
    console.log('All orders loaded:', orders);
    
    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.id) - new Date(a.id));
    setAllOrders(orders);
    
    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    
    setStats({
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders
    });
    
    console.log('Stats calculated:', { totalOrders: orders.length, totalRevenue, pendingOrders });
  };

  const updateOrderStatus = (orderId, userEmail, newStatus) => {
    // Update in localStorage
    const userOrdersKey = `orders_${userEmail}`;
    const userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
    const updatedOrders = userOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
    
    // Reload orders
    loadAllOrders();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-orange-100 text-orange-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if user is admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)'
      }}>
        <motion.div 
          className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">You need admin privileges to access this page.</p>
          <Link to="/login">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto">
              <FiLock className="text-sm" />
              Login as Admin
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)'
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-gray-300">Manage orders, payments, and restaurant operations</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <FiShoppingBag className="text-2xl text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.totalOrders}</div>
                <div className="text-gray-300">Total Orders</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-full">
                <FiDollarSign className="text-2xl text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">₹{stats.totalRevenue}</div>
                <div className="text-gray-300">Total Revenue</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500 rounded-full">
                <FiClock className="text-2xl text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.pendingOrders}</div>
                <div className="text-gray-300">Pending Orders</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Orders Table */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Orders</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  console.log('=== LOCALSTORAGE DEBUG ===');
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage.getItem(key);
                    console.log(`${key}:`, value);
                  }
                  console.log('=== END DEBUG ===');
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Debug
              </button>
              <button 
                onClick={loadAllOrders}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <FiRefreshCw className="text-sm" />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Order ID & Progress</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Items</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Total</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map(order => {
                  const orderSteps = [
                    { name: 'Pending', status: 'Pending' },
                    { name: 'Confirmed', status: 'Confirmed' },
                    { name: 'Preparing', status: 'Preparing' },
                    { name: 'Ready', status: 'Ready' },
                    { name: 'Delivered', status: 'Delivered' }
                  ];
                  
                  const getCurrentStepIndex = () => {
                    return orderSteps.findIndex(step => step.status === order.status);
                  };
                  
                  return (
                    <tr key={`${order.id}-${order.userEmail}`} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="text-gray-300">#{order.id}</div>
                        {/* Order Progress Tracker */}
                        <div className="mt-2">
                          <div className="flex items-center gap-1">
                            {orderSteps.map((step, index) => {
                              const isCompleted = index <= getCurrentStepIndex();
                              const isActive = index === getCurrentStepIndex();
                              
                              return (
                                <div key={step.name} className="flex items-center">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    isCompleted 
                                      ? 'bg-green-500 text-white' 
                                      : isActive 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-600 text-gray-400'
                                  }`}>
                                    {isCompleted ? <FiCheck className="text-xs" /> : index + 1}
                                  </div>
                                  {index < orderSteps.length - 1 && (
                                    <div className={`w-3 h-0.5 ${
                                      isCompleted ? 'bg-green-500' : 'bg-gray-600'
                                    }`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {orderSteps.map((step, index) => {
                              const isCompleted = index <= getCurrentStepIndex();
                              return (
                                <span key={step.name} className={`mr-2 ${
                                  isCompleted ? 'text-green-400 font-semibold' : 'text-gray-500'
                                }`}>
                                  {step.name}
                                </span>
                              );
                            })}
                          </div>
                          <div className="text-xs mt-1">
                            <span className={`px-2 py-1 rounded-full ${
                              order.paymentStatus === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              Payment: {order.paymentStatus || 'Pending'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{order.userEmail}</td>
                      <td className="py-3 px-4 text-gray-300">{order.items.length} items</td>
                      <td className="py-3 px-4 text-green-400 font-semibold">₹{order.total}</td>
                      <td className="py-3 px-4 text-gray-300">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                            title="View Details"
                          >
                            <FiEye className="text-xs" />
                          </button>
                          
                          {order.status !== 'Confirmed' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, order.userEmail, 'Confirmed')}
                              className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                              title="Mark Confirmed"
                            >
                              Confirm
                            </button>
                          )}
                          
                          {order.status !== 'Preparing' && order.status !== 'Pending' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, order.userEmail, 'Preparing')}
                              className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs transition-colors"
                              title="Mark Preparing"
                            >
                              Prepare
                            </button>
                          )}
                          
                          {order.status !== 'Ready' && order.status !== 'Pending' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, order.userEmail, 'Ready')}
                              className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
                              title="Mark Ready"
                            >
                              Ready
                            </button>
                          )}
                          
                          {order.status !== 'Delivered' && order.status !== 'Pending' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, order.userEmail, 'Delivered')}
                              className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                              title="Mark Delivered"
                            >
                              Deliver
                            </button>
                          )}
                          
                          {order.paymentMethod === 'Cash on Delivery' && order.paymentStatus !== 'Paid' && (
                            <button 
                              onClick={() => {
                                const userOrdersKey = `orders_${order.userEmail}`;
                                const userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
                                const updatedOrders = userOrders.map(o => 
                                  o.id === order.id ? { ...o, paymentStatus: 'Paid' } : o
                                );
                                localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
                                loadAllOrders();
                              }}
                              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                              title="Mark Payment Done"
                            >
                              Pay Done
                            </button>
                          )}
                          
                          {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, order.userEmail, 'Cancelled')}
                              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors"
                              title="Cancel Order"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {allOrders.length === 0 && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-400">No orders found</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Order Details</h3>
                  <p className="text-gray-600">Order #{selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Customer Information</h4>
                  <p className="text-gray-600">Email: {selectedOrder.userEmail}</p>
                  <p className="text-gray-600">Date: {selectedOrder.date}</p>
                  <p className="text-gray-600">Time: {selectedOrder.time}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Order Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">₹{item.price * item.quantity}</div>
                        <div className="text-sm text-gray-600">₹{item.price} each</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{selectedOrder.total}</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                {selectedOrder.status === 'Pending' && (
                  <button 
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, selectedOrder.userEmail, 'Confirmed');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Approve Order
                  </button>
                )}
                
                {selectedOrder.status === 'Confirmed' && (
                  <button 
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, selectedOrder.userEmail, 'Preparing');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Start Preparing
                  </button>
                )}
                
                {selectedOrder.status === 'Preparing' && (
                  <button 
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, selectedOrder.userEmail, 'Ready');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Mark as Ready
                  </button>
                )}
                
                {selectedOrder.status === 'Ready' && (
                  <button 
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, selectedOrder.userEmail, 'Delivered');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;