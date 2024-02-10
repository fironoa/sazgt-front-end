import React from "react";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ProductTile } from "./ProductTile";
import { FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import "./Product.css";

export const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("camp-furniture");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("cat");

  const [categories, setCategories] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get("cat"));

  const [products, setProducts] = useState([
    {
      name: "Washing machine",
      model: "Model:2HEF",
      category: "camp-furniture",
    },
    {
      name: "Washing machine",
      model: "Model:2HEF",
      category: "locker-cabinets",
    },
    {
      name: "Washing machine",
      model: "Model:2HEF",
      category: "camp-furniture",
    },
    {
      name: "Washing machine",
      model: "Model:2HEF",
      category: "locker-cabinets",
    },
    {
      name: "Washing machine",
      model: "Model:2HEF",
      category: "camp-furniture",
    },
  ]);

  useEffect(() => {
    console.log("loading...");
  }, []);

  const handleNavigate = (event) => {
    const { name } = event.target; // Use currentTarget to ensure you get the element the event handler is attached to
    console.log(name);

    switch (name) {
      case "camp-furniture":
        navigate("/products?cat=camp-furniture");
        setSelectedProduct(name);
        break;
      case "corporate-gifts":
        navigate("/products?cat=corporate-gifts");
        setSelectedProduct(name);
        break;
      case "locker-cabinets":
        navigate("/products?cat=locker-cabinets");
        setSelectedProduct(name);
        break;
      case "other-categories":
        navigate("/products?cat=other-categories");
        setSelectedProduct(name);
        break;
      case "washing-machine":
        navigate("/products?cat=washing-machine");
        setSelectedProduct(name);
        break;
    }
  };

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
          <button
            onClick={handleNavigate}
            id="camp-furniture"
            name="camp-furniture"
            className={`${
              selectedProduct === "camp-furniture" ? "active" : ""
            }`}
          >
            Camp Furniture
          </button>
          <button
            onClick={handleNavigate}
            id="corporate-gifts"
            name="corporate-gifts"
            className={`${
              selectedProduct === "corporate-gifts" ? "active" : ""
            }`}
          >
            Corporate Gifts
          </button>
          <button
            onClick={handleNavigate}
            other-categories
            id="locker-cabinets"
            name="locker-cabinets"
            className={`${
              selectedProduct === "locker-cabinets" ? "active" : ""
            }`}
          >
            Locker Cabinets
          </button>
          <button
            onClick={handleNavigate}
            id=""
            name="other-categories"
            className={`${
              selectedProduct === "other-categories" ? "active" : ""
            }`}
          >
            Other Category
          </button>
          <button
            onClick={handleNavigate}
            id="washing-machine"
            name="washing-machine"
            className={`${
              selectedProduct === "washing-machine" ? "active" : ""
            }`}
          >
            Washing Machines
          </button>
        </div>
        <div className="product-tiles-wrapper">
          {products.map((product, index) => (
            <ProductTile product={product} />
          ))}
          {category === "locker-cabinets" && <div>locker-cabinets</div>}
        </div>
      </div>
    </div>
  );
};
