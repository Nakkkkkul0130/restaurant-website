import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contact/messages`);
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading messages...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{message.name}</h3>
                  <p className="text-gray-600">{message.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>{message.date}</p>
                  <p>{message.time}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="whitespace-pre-wrap">{message.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;