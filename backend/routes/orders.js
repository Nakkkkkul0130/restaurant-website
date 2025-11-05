const express = require('express');
const router = express.Router();

// Get all orders (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'Orders endpoint' });
});

// Create order (placeholder)
router.post('/', (req, res) => {
  res.json({ message: 'Order created' });
});

module.exports = router;