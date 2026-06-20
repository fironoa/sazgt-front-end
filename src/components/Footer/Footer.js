import React, { useEffect, useRef } from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ContactUs from "./ContactUs/ContactUs";


function Footer() {
  const bgColor = {
    backgroundColor: "#F8F9FB",
  };
  const [showContact, setShowContact] = useState(true);
  const toContactRef = useRef(null);
  const [mapToBeShown, setMapToBeShown] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    if (location.pathname == "/") {
      setMapToBeShown(true);
      if (location.hash === "#contact-us-section") {
        toContactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    else {
      setMapToBeShown(false);
    }

    if(location.pathname == '/admin-dashboard'){
      setShowContact(false);
    } else {
      setShowContact(true);
    }
  }, [location])


  return (
    <div style={bgColor}>
      <div className="footer-container">
        {showContact &&
        <ContactUs mapToBeShown={mapToBeShown} toContactRef={toContactRef}></ContactUs>}
        <div className="copyright">
          <p align='center'>
          Sahil-Al-Zuhoor - Your Reliable Furniture Supplier © 2024 Sahil-Al-Zuhoor General Trading LLC. All Rights Reserved. | Privacy Policy | Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
