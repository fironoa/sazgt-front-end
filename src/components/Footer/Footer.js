import React from "react";
import Form from "./Form/Form";
import Map from "./Map/Map";
import "./Footer.css";

function Footer() {
  const bgColor = {
    backgroundColor: "#F8F9FB",
  };

  return (
    <div style={bgColor}>
      <div className="footer-container">
        <div className="footer-heading">
          <h2>Contact Us</h2>
          <div className="heading-boarder"></div>
        </div>
        <div className="footer-components-wrapper">
          <Map />
          <Form />
        </div>
        <div className="company-contact-details">
          <p align='center'>
            Telephone: +97142808392 | FAX: +97142821973 | Mobile: +97150-8362620
          </p>
          <p>E-mail : info@sazgt.com</p>
        </div>
        <div className="quick-links-heading">
          <h4>Quick Links</h4>
          <div className="quick-links-border"></div>
        </div>
        <div className="quick-links">
          <p align='center'>
            Locker Cabinets | Camp Furniture | Electronics | House Hold
            Appliances
          </p>
        </div>
        <div className="copyright">
          <p align='center'>
            Copyright © 2023 Sahil Al Zuhoor. All Rights Reserved |Privacy
            Policy | Design by gobartsdev.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
