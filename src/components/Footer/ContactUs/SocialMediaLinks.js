import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialMediaLinks = () => {
  return (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <a 
      href="https://www.facebook.com/p/Sahil-Al-Zuhoor-General-Trading-LLC-100081279017739/" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Follow us on Facebook"
    >
      <FaFacebookF size={30} color="#777" />
    </a>

    <a 
      href="https://www.instagram.com/sazgtuae?igsh=MXdnYzNvdzNsZzdtMA==" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Follow us on Instagram"
    >
      <FaInstagram size={30} color="#777" />
    </a>

    <a 
      href="https://www.linkedin.com/in/sahil-al-zuhoor-general-trading-llc-230a5a256/?originalSubdomain=ae" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Connect with us on LinkedIn"
    >
      <FaLinkedinIn size={30} color="#777" />
    </a>
  </div>
);
};

export default SocialMediaLinks;