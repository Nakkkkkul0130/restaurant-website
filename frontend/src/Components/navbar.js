import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from "../Assets/logo.png";
import { BsCart2 } from 'react-icons/bs';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isLoggedIn] = useState(false); // This would come from context/state management

    const menuOptions = [
        { text: "Home", icon: <HomeIcon />, path: "/" },
        { text: "About", icon: <InfoIcon />, path: "/about" },
        { text: "Testimonials", icon: <CommentRoundedIcon />, path: "/testimonials" },
        { text: "Contact", icon: <PhoneRoundedIcon />, path: "/contact" },
        { text: "Cart", icon: <ShoppingCartRoundedIcon />, path: "/cart" },
    ];

    return (
        <motion.nav 
            className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Logo */}
            <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
            >
                <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                {menuOptions.slice(0, 4).map((item, index) => (
                    <motion.div
                        key={item.text}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <Link 
                            to={item.path} 
                            className="text-secondary font-semibold text-lg hover:text-primary transition-colors duration-300 relative group"
                        >
                            {item.text}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </motion.div>
                ))}
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link to="/cart" className="text-secondary hover:text-primary transition-colors duration-300">
                        <BsCart2 className="text-xl" />
                    </Link>
                </motion.div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-3">
                    {!isLoggedIn ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <Link to="/login">
                                    <motion.button 
                                        className="flex items-center gap-2 px-4 py-2 text-secondary hover:text-primary transition-colors duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiLogIn /> Login
                                    </motion.button>
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Link to="/signup">
                                    <motion.button 
                                        className="btn-primary flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiUser /> Sign Up
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </>
                    ) : (
                        <motion.button 
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Profile
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <motion.button
                    onClick={() => setOpenMenu(true)}
                    whileTap={{ scale: 0.95 }}
                    className="text-secondary hover:text-primary transition-colors duration-300"
                >
                    <HiOutlineBars3 className="text-2xl" />
                </motion.button>
            </div>
            
            {/* Mobile Drawer */}
            <Drawer anchor='right' open={openMenu} onClose={() => setOpenMenu(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.path} onClick={() => setOpenMenu(false)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {!isLoggedIn && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/login" onClick={() => setOpenMenu(false)}>
                                        <ListItemIcon><FiLogIn /></ListItemIcon>
                                        <ListItemText primary="Login" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/signup" onClick={() => setOpenMenu(false)}>
                                        <ListItemIcon><FiUser /></ListItemIcon>
                                        <ListItemText primary="Sign Up" />
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