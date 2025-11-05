# Restaurant Website - Full Stack Application

A modern, responsive restaurant website with authentication, built using React, Node.js, Express, and MongoDB.

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

### Frontend
- **Responsive Design** - Works on all devices
- **Modern UI/UX** - Tailwind CSS + Framer Motion animations
- **Authentication** - Login/Signup with JWT
- **Fast Development** - Optimized for quick loading
- **Interactive Components** - Dynamic testimonials, menu, cart

### Backend
- **RESTful API** - Express.js server
- **Authentication** - JWT-based auth system
- **Database** - MongoDB with Mongoose
- **Security** - Password hashing with bcrypt
- **Validation** - Input validation with express-validator

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
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

3. **Start Development (Choose one)**
   ```bash
   # Full stack development
   start-dev.bat
   
   # Fast frontend only (recommended for UI development)
   dev-fast.bat
   
   # Manual start
   cd frontend && npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## ⚡ Performance Optimizations

- **Fast Refresh disabled** for quicker startup
- **Source maps disabled** in development
- **Optimized build process**
- **Axios for API calls** instead of fetch
- **Environment variables** for configuration

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion 10** - Animation library
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing

## 📱 API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

## 🎨 Design System

### Colors
- **Primary**: #fe9e0d (Orange)
- **Secondary**: #4c4c4c (Dark Gray)
- **Accent**: #6a6a6a (Light Gray)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 📄 Pages & Components

### Pages
- **Home** - Hero section with animations
- **About** - Restaurant information
- **Work** - How it works with expandable menu
- **Testimonials** - Customer feedback carousel
- **Contact** - Contact form and info
- **Login** - User authentication
- **Signup** - User registration

### Key Components
- **Navbar** - Responsive navigation with auth buttons
- **Footer** - Social links and contact info
- **Layout** - Consistent page structure

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm run dev     # Fast development mode
npm start       # Standard development
npm run build   # Production build
```

### Backend
```bash
cd backend
npm run dev     # Development with nodemon
npm start       # Production mode
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

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 📞 Support

For support or questions:
- Email: hello@food.com
- Phone: 244-53333-7783

---

**Built with ❤️ for amazing food experiences! 🍽️✨**