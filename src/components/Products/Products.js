import React from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ProductTile } from "./ProductTile";
import "./Product.css";

export const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const handleRotate = () => {
    setRotate(!rotate);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    handleRotate();
    toggleDropdown();
  };
  return (
    <div className="product-container">
      <div className="product-path-sort">
        <div className="product-path">
          <p>/Products/Camp Furniture</p>
        </div>
        <div className="product-sort">
          <p>Sort by</p>
          <div className="dropdown ">
            <button className="dropbtn">
              Rating
              <FaChevronDown
                className={`chevron ${rotate ? "rotate" : ""}`}
                onClick={handleClick}
              />
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sidebar-tiles-wrapper">
        <div className="product-sidebar">
          <p>Categories</p>
          <div class="active icon-alignment">
            <a href="#home">Camp Furniture</a>
          </div>
          <div class="">
            <a href="#home">Corporate Gifts</a>
          </div>
          <div class="">
            <a href="#home">Locker Cabinets</a>
          </div>
          <div class="">
            <a href="#home">Other Category</a>
          </div>
          <div class="">
            <a href="#home">Washing Machines</a>
          </div>
        </div>
        <div className="product-tiles-wrapper">
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
          <ProductTile />
        </div>
      </div>
    </div>
  );
};
