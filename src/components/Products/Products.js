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
import config from "../configuration/ApiConfig";

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
  const [perPage, setPerPage] = useState(30);

  const [categories, setCategories] = useState([]);

  const queryParams = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getCategories = async () => {
      setIsLoading(true);
      const response = await fetch(
        baseURL + "/sazgt/products/distinct/categories"
      );
      const responseData = await response.json();

      setCategories(responseData);

      if (responseData.length > 0) {
        setSelectedCategory(responseData[0]);
      }
      setIsLoading(false);
    };

    getCategories();
  }, []);

  const getProducts = async (category) => {
    setIsLoading(true);
    setProducts([]);
    const productAPI = baseURL + "/sazgt/products?category=" + category;
    const response = await fetch(productAPI);
    const responseData = await response.json();
    setProducts(responseData.data);
    console.log(responseData.data)
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedCategory !== "") {
      getProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const handleNavigate = (event) => {
    const { name } = event.target;

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

  const handlePerPage = (event) => {

    const {id} = event.target;
    const value = parseInt(id);
    setPerPage(value);
    handleRotate();
    toggleDropdown();

  }
  return (
    <div className="product-container">
      {isLoading && <LinearLoading></LinearLoading>}
      <div className="product-path-sort">
        <div className="product-sort">
          <p>Show</p>
          <div className="dropdown ">
            <button className={`dropbtn`} onClick={handleClick}>
              {perPage} Products
              <FaChevronDown className={`chevron ${rotate ? "rotate" : ""}`} />
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <p id="30" onClick={handlePerPage}>30</p>
                <p id="50" onClick={handlePerPage}>50</p>
                <p id="100" onClick={handlePerPage}>100</p>
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
            <ProductTile product={product} key={index}/>
          ))}
        </div>
      </div>
      <div className="pagination">
        <div className="pagination-div">
          <FaChevronLeft />
        </div>
        <div className="pagination-div active">1</div>
        <div className="pagination-div">1</div>
        <div className="pagination-div">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};
