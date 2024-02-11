import React from "react";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ProductTile } from "./ProductTile";
import { IoIosArrowForward } from "react-icons/io";
import { FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import "./Product.css";
import LinearLoading from "../LinearLoading/LinearLoading";
import config from '../configuration/ApiConfig';

export const Products = () => {
  const baseURL = config.baseURL;
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("cat");

  const [categories, setCategories] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get("cat"));

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("loading...");

    const getCategories = async () => {
      setIsLoading(true);
      const response = await fetch(
        baseURL + "/sazgt/products/distinct/categories"
      );
      const responseData = await response.json();

      setCategories(responseData);
      console.log(categories);

      if (responseData.length > 0) {
        setSelectedCategory(responseData[0]);
      }
      setIsLoading(false);
    };

    getCategories();
  }, []);

  const getProducts = async (category) => {
    setIsLoading(true);
    const productAPI =
      "http://192.168.1.15:5000/api/sazgt/products?category=" + category;
    console.log(productAPI);
    const response = await fetch(productAPI);
    const responseData = await response.json();
    console.log(responseData);
    setProducts(responseData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Getting products on selecting catg");
    if (selectedCategory !== "") {
      console.log("Ready to get products...");
      getProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const handleNavigate = (event) => {
    const { name } = event.target; // Use currentTarget to ensure you get the element the event handler is attached to
    console.log(name);

    navigate("/products?category=" + name);
    setSelectedCategory(name);
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
      {isLoading && <LinearLoading></LinearLoading>}
      <div className="product-path-sort">
        <div className="product-path">
          <p>
            <div style={{ display: "flex" }}>
              <IoMdHome />
            </div>
            /Products/{selectedCategory}
          </p>
        </div>
        <div className="product-sort">
          <p>Sort by</p>
          <div className="dropdown ">
            <button className={`dropbtn`} onClick={handleClick}>
              Rating
              <FaChevronDown className={`chevron ${rotate ? "rotate" : ""}`} />
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
          {categories !== null &&
            categories.map((cat) => (
              <button
                onClick={handleNavigate}
                id={cat}
                name={cat}
                className={`${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
                {selectedCategory === cat && <IoIosArrowForward />}
              </button>
            ))}
        </div>
        <div className="product-tiles-wrapper">
          {products.map((product, index) => (
            <ProductTile product={product} />
          ))}
        </div>
      </div>
      <div className="pagination">
        <div className="pagination-div">
          <FaChevronLeft />
        </div>
        <div className="pagination-div">1</div>
        <div className="pagination-div">1</div>
        <div className="pagination-div">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};
