import React from "react";
import { useState, useRef, useEffect } from "react";
import logodraft1 from "../../images/logodraft1.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { subCategoriesFromConfig } from '../configuration/ApiConfig';
import "./Header.css";
import Navbar from "./Navbar";

function Header() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [perPage, setPerPage] = useState(localStorage.getItem("perPage") || "10");
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 900);
  const location = useLocation();
  const navRef = useRef();


  useEffect(() => {
    const handleShowNav = () => {
      if (location.pathname == '/admin-dashboard') {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    }
    handleShowNav();
  }, [location])

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
    let sub_category = "";
    if (subCategoriesFromConfig[cat] && subCategoriesFromConfig[cat][0] !== undefined) {
      sub_category = subCategoriesFromConfig[cat][0];
    }
    
    let url = '/products?category=' + cat + '&per_page=' + perPage;
    if (sub_category) {
      url += '&sub_category=' + sub_category;
    }
    
    navigate(url);
  };


  return (
    <>
      <div className="container">
        <div className="header">
          <div className="box" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logodraft1} alt="Logo" width="270px" />
          </div>
          {showNav &&
            <div className="box">
              <div className="search">
                <CiSearch />
                <input placeholder="Search"></input>
              </div>
            </div>
          }
          {showNav &&
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
                  <a href="mailto:info@sazgt.com">info@sazgt.com</a>
                </div>
              </div>
              {!isScreenSmall && (
                <div className="contact">
                  <div className="cont-content" style={{ cursor: "pointer" }} onClick={() => navigate('/#contact-us-section')}><p>Contact&nbsp;Us</p></div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
      <div id="line-above-nav-bar" className="line"></div>
      {showNav && <Navbar handleClick={handleClick} showNavbar={showNavbar}></Navbar>}
      <div id="line-below-nav-bar" className="line"></div>
    </>
  );
}

export default Header;
