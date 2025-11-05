import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password, loginType = 'customer') => {
    try {
      if (loginType === 'admin') {
        // Admin login with hardcoded credentials
        if (email === 'admin@indianlounge.com' && password === 'admin910353') {
          const adminUser = {
            id: 'admin',
            name: 'Admin',
            email: 'admin@indianlounge.com',
            role: 'admin'
          };
          
          localStorage.setItem('token', 'admin-token');
          localStorage.setItem('user', JSON.stringify(adminUser));
          setUser(adminUser);
          
          return { success: true };
        } else {
          return { success: false, error: 'Invalid admin credentials' };
        }
      } else {
        // Customer login via API
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        const { token, user: userData } = response.data;
        
        // Add customer role
        userData.role = 'customer';
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};