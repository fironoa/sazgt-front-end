import React from "react";
import logodraft1 from "../../images/logodraft1.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./Header.css";
function Header() {
  const navigate = useNavigate();

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
      </div>
      <div className="line"></div>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <a onClick={handleClick}>Camp Furniture</a>
            </li>
            <li>
              <a onClick={handleClick}>Office Furniture</a>
            </li>
            <li>
              <a onClick={handleClick}>School Furniture</a>
            </li>
            <li>
              <a onClick={handleClick}>Restaurant & pantry furniture</a>
            </li>
            <li>
              <a onClick={handleClick}>Electronic appliances</a>
            </li>
            <li>
              <a onClick={handleClick}>Safety products</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="line"></div>
    </div>
  );
}

export default Header;
