const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// Search restaurants
router.get('/search', async (req, res) => {
  try {
    const { 
      location, 
      cuisine, 
      priceRange, 
      rating, 
      lat, 
      lng, 
      radius = 10,
      limit = 20 
    } = req.query;

    let query = { isActive: true };
    
    // Location-based search
    if (lat && lng) {
      query['location.coordinates'] = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    } else if (location) {
      query['location.city'] = new RegExp(location, 'i');
    }

    // Cuisine filter
    if (cuisine) {
      query.cuisine = { $in: cuisine.split(',') };
    }

    // Price range filter
    if (priceRange) {
      query.priceRange = { $in: priceRange.split(',') };
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    const restaurants = await Restaurant.find(query)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    res.json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add sample restaurants (for testing)
router.post('/seed', async (req, res) => {
  try {
    const sampleRestaurants = [
      {
        name: "Spice Garden",
        description: "Authentic Indian cuisine with traditional flavors",
        cuisine: ["Indian", "Vegetarian"],
        location: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        priceRange: "$$",
        rating: 4.5,
        images: ["https://via.placeholder.com/400x300"],
        contact: { phone: "+1-555-0123", email: "info@spicegarden.com" },
        features: ["delivery", "takeout", "dine-in"]
      },
      {
        name: "Pizza Corner",
        description: "Fresh wood-fired pizzas with premium ingredients",
        cuisine: ["Italian", "Pizza"],
        location: {
          address: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        priceRange: "$",
        rating: 4.2,
        images: ["https://via.placeholder.com/400x300"],
        contact: { phone: "+1-555-0456" },
        features: ["delivery", "takeout"]
      }
    ];

    await Restaurant.deleteMany({});
    await Restaurant.insertMany(sampleRestaurants);
    
    res.json({ success: true, message: 'Sample restaurants added' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;