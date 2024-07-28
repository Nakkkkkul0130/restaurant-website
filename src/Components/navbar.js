import React from 'react';
import Logo from "../Assets/logo.png";
import { BsCart2 } from 'react-icons/bs';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const navigate = useNavigate();

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />
        },
        {
            text: "About",
            icon: <InfoIcon />
        },
        {
            text: "Testimonials",
            icon: <CommentRoundedIcon />
        },
        {
            text: "Contact",
            icon: <PhoneRoundedIcon />
        },
        {
            text: "Cart",
            icon: <ShoppingCartRoundedIcon />
        },
    ];

    const handleBookingNow = () => {
        navigate('/registration');
    };

    return (
        <nav>
            <div className='nav-logo-container'>
                <img src={Logo} alt="Logo" />
            </div>
            <div className='navbar-links-container'>
                <Link to="/" className='navbar-link'>Home</Link>
                <Link to="/about" className='navbar-link'>About</Link>
                <Link to="/testimonials" className='navbar-link'>Feedback</Link>
                <Link to="/contact" className='navbar-link'>Contact</Link>
                <Link to="/cart" className='navbar-link'>
                    <BsCart2 className='navbar-cart-icon' />
                </Link>
                <button className='primary-button' onClick={handleBookingNow}>Booking Now</button>
            </div>
            <div className='navbar-menu-container'>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
            </div>
            
            <Drawer anchor='right' open={openMenu} onClose={() => setOpenMenu(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    );
};

export default Navbar;
