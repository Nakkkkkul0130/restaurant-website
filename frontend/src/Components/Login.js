import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('customer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password, loginType);
    
    if (result.success) {
      if (loginType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brown-100/30 to-white/50">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            className="mt-2 text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Sign in to your account
          </motion.p>
        </div>

        <motion.form 
          className="space-y-6" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setLoginType('customer')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                loginType === 'customer'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-primary'
              }`}
            >
              <FiUser />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                loginType === 'admin'
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-red-500'
              }`}
            >
              <FiShield />
              <span>Admin</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full justify-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              loginType === 'admin'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'btn-secondary'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Signing in...' : `Sign In as ${loginType === 'admin' ? 'Admin' : 'Customer'}`}
          </motion.button>

          <div className="text-center">
            <p className="text-accent">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-orange-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;