import React from "react";
import { useState, useRef, useEffect } from "react";
import logodraft1 from "../../images/logodraft1.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./Header.css";
import { categoriesFromConfig } from "../configuration/ApiConfig";

function Header() {
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(localStorage.getItem("perPage") || "10");
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 900);

  const navRef = useRef();


  useEffect(() => {
    const handleResize = () => {
      const screenIsSmall = window.innerWidth <= 900;
      setIsScreenSmall(screenIsSmall);

    };

    // Initial check and set up event listener for screen resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const handleClick = (cat) => {
    const url = '/products?category=' + cat + '&per_page=' + perPage;
    navigate(url);
  };


  return (
    <>
      <div className="container">
        <div className="header">
          <div className="box" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
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
              <div className="cont-content">
                <a href="tel:+971508362620">+971508362620</a>
              </div>
            </div>
            <div className="contact">
              <div className="icon">
                <IoIosMail size={20} />
              </div>
              <div className="cont-content">
                <a href="mailto:+971508362620">info@sazgt.com</a>
              </div>
            </div>
            {!isScreenSmall && (
              <div className="contact">
                <div className="cont-content" style={{ cursor: "pointer" }} onClick={() => navigate('/#contact-us-section')}><p>Contact&nbsp;Us</p></div>
              </div>
            )}


          </div>
        </div>
      </div>
      <div id="line-above-nav-bar" className="line"></div>
      <div className={`navbar-wrapper `}>
        <nav className={`navbar`}>
          <div className={`nav-list`} ref={navRef}>
            {categoriesFromConfig.map((cat, index) => {
              return (
                <a onClick={() => handleClick(cat)}>{cat}</a>
              )
            })}
            <button className={`nav-btn nav-close-btn`}>
              <FaTimes onClick={showNavbar} />
            </button>
          </div>
        </nav>
      </div>
      <div id="line-below-nav-bar" className="line"></div>
    </>
  );
}

export default Header;
