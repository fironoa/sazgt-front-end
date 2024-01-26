import React from "react";
import logodraft1 from "E:/Freelance/sazgt/sazgt-front-end/src/images/logodraft1.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import "./Header.css";
function Header() {
  return (
    <div className="container">
      <div className="header">
        <div className="box">
          <img src={logodraft1} alt="Logo" width="270px" height="65px" />
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
      </div>
      <div className="line"></div>
      <div className="navbar">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <a href="#">Locker Cabinets</a>
            </li>
            <li>
              <a href="#">Camp Furniture</a>
            </li>
            <li>
              <a href="#">Electronics</a>
            </li>
            <li>
              <a href="#">House Hold Appliances Us</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="line"></div>
    </div>
  );
}

export default Header;
