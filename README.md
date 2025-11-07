# Indian Lounge - Full Stack Restaurant Website

The Indian Lounge project is a full-stack restaurant website built to deliver a complete digital dining experience. It allows users to browse a wide range of authentic Indian dishes, place online orders, track order status in real-time, and manage their profiles through a responsive, user-friendly interface. The admin panel provides restaurant management tools including order tracking, revenue analytics, and menu management. The platform features JWT-based authentication, MongoDB integration, real-time order status updates, and an elegant modern UI with Framer Motion animations and Tailwind CSS styling.
## 🏗️ Project Structure

```
restaurant-website/
├── frontend/                 # React frontend application
│   ├── src/Components/      # React components
│   ├── public/              # Public assets
│   ├── .env                 # Frontend environment variables
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── .env                 # Backend environment variables
│   └── server.js            # Express server
├── install-all.bat          # Install all dependencies
├── start-dev.bat            # Start both servers
├── dev-fast.bat             # Fast frontend development
└── README.md                # Project documentation
```

## ✨ Features

### 🍽️ Restaurant Features
- **Extensive Menu** - 140+ authentic Indian dishes across 18 categories
- **Daily Specials** - Rotating daily offers based on date
- **Order Management** - Complete cart and checkout system
- **Multiple Payment Options** - UPI, Cash on Delivery, Cards, Net Banking
- **Order Tracking** - Real-time status updates (Pending → Confirmed → Preparing → Ready → Delivered)
- **User Dashboard** - Order history, cart management, profile

### 🎨 Frontend
- **Modern UI/UX** - Orange/red gradient theme with Indian aesthetics
- **Responsive Design** - Works perfectly on all devices
- **Framer Motion Animations** - Smooth transitions and effects
- **Authentication System** - JWT-based login/signup
- **Role-based Access** - Customer and Admin roles
- **Restaurant Search** - Find restaurants by location using free APIs

### 🔧 Backend
- **RESTful API** - Express.js server
- **MongoDB Integration** - User data, orders, menu management
- **JWT Authentication** - Secure token-based auth
- **Admin Panel** - Order management, revenue analytics
- **Password Security** - bcrypt hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd restaurant-website
   ```

2. **Install all dependencies**
   ```bash
   install-all.bat
   ```

3. **Environment Setup**
   Create `.env` files in both frontend and backend directories:
   
   **Backend `.env`:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start Development**
   ```bash
   # Full stack development
   start-dev.bat
   
   # Fast frontend only
   dev-fast.bat
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 👥 User Roles

### Customer Features
- Browse menu with filters
- Add items to cart with quantity control
- Place orders with multiple payment options
- Track order status in real-time
- View order history
- Receive celebration animations on order completion
- Provide feedback and ratings

### Admin Features
- **Order Management** - View, update order status
- **Payment Tracking** - Monitor payment status
- **Revenue Analytics** - Track daily/monthly earnings
- **Menu Management** - Add/edit menu items
- **Customer Management** - View customer orders

## 🎯 Key Pages

- **Home** - Hero section with animations and daily specials
- **Menu** - Complete menu with 140+ items, filters, cart functionality
- **How it Works** - 3-step ordering process
- **Restaurant Search** - Find restaurants using location-based search
- **Dashboard** - User profile, cart, order history
- **Admin Panel** - Complete restaurant management system
- **Contact** - Contact form and restaurant information

## 🔐 Authentication

- **Customer Login** - Standard email/password authentication
- **Admin Access** - Special admin credentials for management panel
- **JWT Tokens** - Secure session management
- **Role-based Routing** - Protected routes based on user role

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion 10** - Advanced animations
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing

## 🎨 Design System

### Colors
- **Primary**: #fe9e0d (Orange)
- **Secondary**: #dc2626 (Red)
- **Accent**: #f97316 (Orange variants)
- **Background**: Gradient combinations

### Features
- **Daily Rotating Specials** - 7 different offers
- **Celebration Animations** - Crackers on order completion
- **Glassmorphism UI** - Modern glass effects
- **Responsive Grid** - Mobile-first design

## 📱 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

### Orders
```
GET  /api/orders        - Get user orders
POST /api/orders        - Create new order
PUT  /api/orders/:id    - Update order status
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables
# Deploy to your platform
```

## 🔒 Security Features

- Environment variables protection (.gitignore)
- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Role-based access control

## 📞 Contact & Support

- **Restaurant**: Indian Lounge
- **Developer**: Made with ❤️ by Nakul
- **Social Media**: Twitter, LinkedIn, Instagram links in footer

## 🎉 Special Features

- **Daily Specials** - Automatically rotating offers
- **Order Celebrations** - Fireworks animation on completion
- **Feedback System** - Customer rating and reviews
- **Real-time Updates** - Live order status tracking
- **Mobile Optimized** - Perfect mobile experience

---

**Experience authentic Indian cuisine with modern technology! 🍽️✨**
