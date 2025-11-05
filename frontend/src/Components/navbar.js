import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from "../Assets/logo.png";

import { HiOutlineBars3, HiSparkles } from 'react-icons/hi2';
import { FiUser, FiLogIn, FiLogOut, FiSearch } from 'react-icons/fi';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuOptions = [
        { text: "Home", icon: <HomeIcon />, path: "/" },
        { text: "About", icon: <InfoIcon />, path: "/about" },
        { text: "Testimonials", icon: <CommentRoundedIcon />, path: "/testimonials" },
        { text: "Contact", icon: <PhoneRoundedIcon />, path: "/contact" },
    ];

    const isActivePath = (path) => location.pathname === path;

    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'glass-card backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
                    : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6 h-20">
                {/* Logo */}
                <motion.div 
                    className="flex items-center gap-3 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="relative">
                        <img src={Logo} alt="Logo" className="h-10 w-auto" />
                        <motion.div 
                            className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-sm"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-gray-800 font-bold text-xl">Indian Lounge</div>
                        <div className="text-gray-600 text-xs">Authentic • Spices • Heritage</div>
                    </div>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                    {menuOptions.map((item, index) => (
                        <motion.div
                            key={item.text}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={item.path}>
                                <motion.div 
                                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                        isActivePath(item.path)
                                            ? 'text-gray-800 bg-orange-100 backdrop-blur-sm'
                                            : 'text-gray-700 hover:text-gray-800 hover:bg-gray-100'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.text}
                                    {isActivePath(item.path) && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl"
                                            layoutId="activeTab"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                    
                    {/* Find Restaurants Button */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to="/restaurants">
                            <motion.button 
                                className="relative px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <FiSearch className="text-sm" />
                                    Find Restaurants
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </motion.button>
                        </Link>
                    </motion.div>
                    
                    {/* Admin Panel Button - Only for Admins */}
                    {isAdmin && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Link to="/admin">
                                <motion.button 
                                    className="relative px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10 text-sm">
                                        Admin Panel
                                    </span>
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">


                    {/* Auth Section */}
                    <div className="hidden md:flex items-center space-x-3">
                        {!isAuthenticated ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <Link to="/login">
                                        <motion.button 
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FiLogIn className="text-sm" /> Login
                                        </motion.button>
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <Link to="/signup">
                                        <motion.button 
                                            className="btn-glow flex items-center gap-2 text-sm"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <HiSparkles className="text-sm" /> Join Now
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to={isAdmin ? "/admin" : "/dashboard"}>
                                    <motion.div 
                                        className={`glass-card px-3 py-2 rounded-xl cursor-pointer ${
                                            isAdmin ? 'border border-red-200' : 'border border-orange-200'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                                isAdmin 
                                                    ? 'bg-gradient-to-r from-red-500 to-red-600' 
                                                    : 'bg-gradient-to-r from-orange-500 to-red-500'
                                            }`}>
                                                {user?.name?.charAt(0)?.toUpperCase()}
                                            </div>
                                            <div>
                                                <span className="text-gray-800 font-medium text-sm block">Hi, {user?.name}</span>
                                                {isAdmin && <span className="text-red-600 text-xs">Admin</span>}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                                <motion.button 
                                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all duration-300"
                                    onClick={logout}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiLogOut className="text-sm" />
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={() => setOpenMenu(true)}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-700 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition-all duration-300"
                        >
                            <HiOutlineBars3 className="text-2xl" />
                        </motion.button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Drawer */}
            <Drawer 
                anchor='right' 
                open={openMenu} 
                onClose={() => setOpenMenu(false)}
                PaperProps={{
                    sx: {
                        background: 'rgba(15, 15, 35, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white'
                    }
                }}
            >
                <Box sx={{ width: 280, padding: 2 }} role="presentation">
                    <div className="mb-6">
                        <div className="text-white font-bold text-xl mb-1">Indian Lounge</div>
                        <div className="text-white/60 text-sm">Authentic • Spices • Heritage</div>
                    </div>
                    
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton 
                                    component={Link} 
                                    to={item.path} 
                                    onClick={() => setOpenMenu(false)}
                                    sx={{ 
                                        borderRadius: 2, 
                                        '&:hover': { 
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                                        } 
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ color: 'white' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        
                        <ListItem disablePadding sx={{ mb: 2 }}>
                            <ListItemButton 
                                component={Link} 
                                to="/menu" 
                                onClick={() => setOpenMenu(false)}
                                sx={{ 
                                    borderRadius: 2,
                                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                    '&:hover': { 
                                        background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)' 
                                    } 
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                    <FiSearch />
                                </ListItemIcon>
                                <ListItemText primary="Our Menu" sx={{ color: 'white' }} />
                            </ListItemButton>
                        </ListItem>
                        
                        {!isAuthenticated ? (
                            <>
                                <ListItem disablePadding sx={{ mb: 1 }}>
                                    <ListItemButton 
                                        component={Link} 
                                        to="/login" 
                                        onClick={() => setOpenMenu(false)}
                                        sx={{ 
                                            borderRadius: 2, 
                                            '&:hover': { 
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                                            } 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                            <FiLogIn />
                                        </ListItemIcon>
                                        <ListItemText primary="Login" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton 
                                        component={Link} 
                                        to="/signup" 
                                        onClick={() => setOpenMenu(false)}
                                        sx={{ 
                                            borderRadius: 2, 
                                            '&:hover': { 
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                                            } 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                            <FiUser />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign Up" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem disablePadding sx={{ mb: 1 }}>
                                    <ListItemButton 
                                        component={Link} 
                                        to={isAdmin ? "/admin" : "/dashboard"}
                                        onClick={() => setOpenMenu(false)}
                                        sx={{ 
                                            borderRadius: 2, 
                                            '&:hover': { 
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                                            } 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                            <FiUser />
                                        </ListItemIcon>
                                        <ListItemText primary={isAdmin ? "Admin Panel" : "Dashboard"} sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton 
                                        onClick={() => { logout(); setOpenMenu(false); }}
                                        sx={{ 
                                            borderRadius: 2, 
                                            '&:hover': { 
                                                backgroundColor: 'rgba(239, 68, 68, 0.1)' 
                                            } 
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
                                            <FiLogOut />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" sx={{ color: '#ef4444' }} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </motion.nav>
    );
};

export default Navbar;