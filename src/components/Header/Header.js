import React from "react";
import { useState, useRef } from "react";
import logodraft1 from "../../images/logodraft1.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import { FaTimes, FaBars } from "react-icons/fa";
import "./Header.css";
function Header() {
  const navigate = useNavigate();

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const handleClick = () => {
    navigate("/products");
  };
  return (
    <div className="container">
      <div className="header">
        <div className="box">
          <img src={logodraft1} alt="Logo" width="270px" />
        </div>
        <div className="box">
          <div className="search">
            <CiSearch />
            <input placeholder="Search"></input>
          </div>
        </div>
        <div className="box">
          <div className="contact">
            <div className="icon">
              <FaPhoneAlt size={12} />
            </div>
            <div className="cont-content">9400285065</div>
          </div>
          <div className="contact">
            <div className="icon">
              <IoIosMail size={20} />
            </div>
            <div className="cont-content">info@sazgt.com</div>
          </div>
        </div>
        <div>
          <button className="nav-btn">
            <FaBars onClick={showNavbar} />
          </button>
        </div>
      </div>
      <div className="line"></div>
      <div className={`navbar-wrapper `}>
        <nav className={`navbar`}>
          <div className={`nav-list`} ref={navRef}>
            <a onClick={handleClick}>Camp Furniture</a>
            <a onClick={handleClick}>Office Furniture</a>
            <a onClick={handleClick}>School Furniture</a>
            <a onClick={handleClick}>Restaurant & pantry furniture</a>
            <a onClick={handleClick}>Electronic appliances</a>
            <a onClick={handleClick}>Safety products</a>
            <button className={`nav-btn nav-close-btn`}>
              <FaTimes onClick={showNavbar} />
            </button>
          </div>
        </nav>
      </div>
      <div className="line"></div>
    </div>
  );
}

export default Header;
