import React from 'react'
import Logo from '../Assets/logo.png';
import { BsTwitter } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { BsInstagram } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
        <div className='footer-section-one'>
            <div className='footer-logo-container'>
                <img src={Logo} alt="" />
            </div>
            <div className='footer-icons'>
            <a href="https://x.com/Nakulbhar001" target="_blank" rel="noopener noreferrer">
            <BsTwitter />
          </a>
          <a href="https://www.linkedin.com/in/nakul-bhar0130/" target="_blank" rel="noopener noreferrer">
            <SiLinkedin />
          </a>
          <a href="https://www.instagram.com/nakul_bhar0130/" target="_blank" rel="noopener noreferrer">
            <BsInstagram />
          </a>
            <BsYoutube />
          
            </div>
        </div>
        <div className='footer-section-two'>
            <div className='footer-section-columns'>
                <span>Contact Us: 244-53333-7783</span>
                <span>Email: hello@food.com</span>
                <span>Press: press@food.com</span>
                <span>General: contact@food.com</span>
            </div>
            <div className='footer-section-columns'>
                <span>Terms and Conditions</span>
                <span>Privacy Policy</span>
            </div>

        </div>
    </div>
  )
}

export default Footer;