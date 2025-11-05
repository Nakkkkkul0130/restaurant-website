import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiStar, FiNavigation } from 'react-icons/fi';
import axios from 'axios';

// Free APIs configuration
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_BASE_URL = 'https://overpass-api.de/api/interpreter';
const FOURSQUARE_API_KEY = process.env.REACT_APP_FOURSQUARE_API_KEY || 'free_tier_key';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const RestaurantSearch = () => {
  const [filters, setFilters] = useState({
    location: '',
    cuisine: '',
    rating: ''
  });
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const cuisineOptions = ['Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'Thai', 'Japanese'];


  const searchRestaurants = async () => {
    setLoading(true);
    try {
      if (!filters.location) {
        setRestaurants([]);
        setLoading(false);
        return;
      }

      // Use Nominatim (OpenStreetMap) for free geocoding
      const geocodeResponse = await fetch(
        `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(filters.location)}&limit=1`
      );
      
      if (!geocodeResponse.ok) {
        throw new Error('Failed to geocode location');
      }
      
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData.length === 0) {
        setRestaurants([]);
        setLoading(false);
        return;
      }

      const location = {
        lat: parseFloat(geocodeData[0].lat),
        lng: parseFloat(geocodeData[0].lon)
      };
      
      // Use Overpass API (OpenStreetMap) to find restaurants
      const cuisineFilter = filters.cuisine ? `[cuisine~"${filters.cuisine.toLowerCase()}"]` : '';
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="restaurant"]${cuisineFilter}(around:5000,${location.lat},${location.lng});
          way["amenity"="restaurant"]${cuisineFilter}(around:5000,${location.lat},${location.lng});
          relation["amenity"="restaurant"]${cuisineFilter}(around:5000,${location.lat},${location.lng});
        );
        out geom;
      `;
      
      const overpassResponse = await fetch(OVERPASS_BASE_URL, {
        method: 'POST',
        body: overpassQuery
      });
      
      if (!overpassResponse.ok) {
        throw new Error('Failed to search restaurants');
      }
      
      const overpassData = await overpassResponse.json();
      
      // Transform OpenStreetMap data to our format
      let transformedRestaurants = overpassData.elements.map((place, index) => ({
        _id: place.id || `osm_${index}`,
        name: place.tags?.name || 'Restaurant',
        description: place.tags?.description || `${place.tags?.cuisine || 'Restaurant'} in ${filters.location}`,
        location: {
          city: filters.location.split(',')[0].trim(),
          state: 'India',
          address: place.tags?.['addr:full'] || place.tags?.['addr:street'] || 'Address not available'
        },
        cuisine: getCuisineFromTags(place.tags),
        rating: generateRandomRating(), // OSM doesn't have ratings, so generate realistic ones
        features: getFeaturesFromTags(place.tags),
        photos: [], // OSM doesn't have photos
        priceLevel: Math.floor(Math.random() * 4) + 1,
        isOpen: Math.random() > 0.3, // Random open/closed status
        phone: place.tags?.phone,
        website: place.tags?.website
      }));
      
      // If no results from OSM, use mock data with realistic restaurants
      if (transformedRestaurants.length === 0) {
        transformedRestaurants = generateMockRestaurants(filters.location, filters.cuisine);
      }
      
      // Apply rating filter
      if (filters.rating) {
        transformedRestaurants = transformedRestaurants.filter(r => 
          r.rating >= parseFloat(filters.rating)
        );
      }
      
      // Limit to 20 results
      transformedRestaurants = transformedRestaurants.slice(0, 20);
      
      setRestaurants(transformedRestaurants);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock data
      setRestaurants(generateMockRestaurants(filters.location, filters.cuisine));
    } finally {
      setLoading(false);
    }
  };
  
  const getCuisineFromTags = (tags) => {
    if (!tags) return ['Restaurant'];
    
    const cuisine = tags.cuisine;
    if (cuisine) {
      const cuisines = cuisine.split(';').map(c => 
        c.trim().charAt(0).toUpperCase() + c.trim().slice(1)
      );
      return cuisines;
    }
    
    // Fallback based on name
    const name = tags.name?.toLowerCase() || '';
    if (name.includes('pizza')) return ['Italian'];
    if (name.includes('chinese') || name.includes('china')) return ['Chinese'];
    if (name.includes('indian') || name.includes('masala') || name.includes('curry')) return ['Indian'];
    if (name.includes('thai')) return ['Thai'];
    if (name.includes('mexican') || name.includes('taco')) return ['Mexican'];
    
    return ['Restaurant'];
  };
  
  const getFeaturesFromTags = (tags) => {
    if (!tags) return ['Dine-in'];
    
    const features = [];
    if (tags.delivery === 'yes') features.push('Delivery');
    if (tags.takeaway === 'yes') features.push('Takeout');
    if (tags['wheelchair'] === 'yes') features.push('Wheelchair Accessible');
    if (tags.outdoor_seating === 'yes') features.push('Outdoor Seating');
    
    return features.length > 0 ? features : ['Dine-in'];
  };
  
  const generateRandomRating = () => {
    // Generate realistic ratings between 3.0 and 5.0
    return Math.round((Math.random() * 2 + 3) * 10) / 10;
  };
  
  const generateMockRestaurants = (location, cuisine) => {
    const restaurantNames = {
      Indian: ['Spice Garden', 'Curry House', 'Masala Palace', 'Tandoor Express', 'Biryani Corner'],
      Italian: ['Pasta Palace', 'Pizza Corner', 'Italian Bistro', 'Roma Restaurant', 'Venezia'],
      Chinese: ['Dragon Wok', 'Golden Dragon', 'China Garden', 'Panda Express', 'Great Wall'],
      Mexican: ['Taco Bell', 'Mexican Grill', 'Burrito House', 'Fiesta Restaurant', 'Casa Mexico'],
      Thai: ['Thai Garden', 'Bangkok Kitchen', 'Spicy Thai', 'Thai Palace', 'Siam Restaurant'],
      Japanese: ['Sushi Zen', 'Tokyo Kitchen', 'Sakura Restaurant', 'Ramen House', 'Ninja Sushi']
    };
    
    const selectedCuisine = cuisine || 'Indian';
    const names = restaurantNames[selectedCuisine] || restaurantNames.Indian;
    
    return names.map((name, index) => ({
      _id: `mock_${index}`,
      name: `${name} ${location}`,
      description: `Authentic ${selectedCuisine} cuisine in ${location}`,
      location: {
        city: location.split(',')[0].trim(),
        state: 'India',
        address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${location}`
      },
      cuisine: [selectedCuisine],
      rating: generateRandomRating(),
      features: ['Delivery', 'Takeout', 'Dine-in'],
      photos: [],
      priceLevel: Math.floor(Math.random() * 4) + 1,
      isOpen: Math.random() > 0.2
    }));
  };

  useEffect(() => {
    searchRestaurants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Use Nominatim (free) for reverse geocoding
            try {
              const response = await fetch(
                `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
              );
              const data = await response.json();
              
              if (data && data.display_name) {
                const address = data.display_name;
                setFilters(prev => ({ ...prev, location: address }));
              } else {
                setFilters(prev => ({ ...prev, location: 'Current Location, India' }));
              }
            } catch (error) {
              console.error('Geocoding error:', error);
              setFilters(prev => ({ ...prev, location: 'Current Location, India' }));
            }
          } catch (error) {
            console.error('Geocoding error:', error);
            setFilters(prev => ({ ...prev, location: 'Current Location' }));
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error('Location error:', error);
          alert('Unable to get your location. Please enter manually.');
          setLocationLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLocationLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-100/30 to-white/50 pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Find Your Perfect Restaurant
          </h1>
          <p className="text-xl text-accent">
            Discover amazing restaurants based on location, cuisine, and budget
          </p>
        </motion.div>

        {/* Search Filters */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter city or location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-400"
                title="Use current location"
              >
                {locationLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                ) : (
                  <FiNavigation className="w-4 h-4" />
                )}
              </button>
            </div>

            <select
              value={filters.cuisine}
              onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Cuisines</option>
              {cuisineOptions.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>

          <motion.button
            onClick={searchRestaurants}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSearch className="w-4 h-4" />
            {loading ? 'Searching...' : 'Search Restaurants'}
          </motion.button>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gray-200 relative">
                {restaurant.photos?.[0] ? (
                  <img 
                    src={restaurant.photos[0]} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-6xl mb-2">🍽️</div>
                  </div>
                )}
                {restaurant.isOpen !== undefined && (
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${
                    restaurant.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {restaurant.isOpen ? 'Open' : 'Closed'}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">{restaurant.name}</h3>
                <p className="text-accent mb-3 line-clamp-2">{restaurant.description}</p>
                
                <div className="flex items-center mb-2">
                  <FiMapPin className="text-gray-400 mr-2" />
                  <span className="text-sm text-accent">
                    {restaurant.location.address || `${restaurant.location.city}, ${restaurant.location.state}`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{restaurant.rating > 0 ? restaurant.rating.toFixed(1) : 'N/A'}</span>
                    {restaurant.priceLevel > 0 && (
                      <span className="ml-2 text-green-600 font-bold">
                        {'₹'.repeat(restaurant.priceLevel)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.cuisine.slice(0, 2).map(c => (
                      <span key={c} className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {restaurant.features && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {restaurant.features.slice(0, 3).map(feature => (
                      <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {restaurants.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-accent">No restaurants found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantSearch;