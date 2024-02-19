import React from "react";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ProductTile } from "./ProductTile";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import "./Product.css";
import LinearLoading from "../LinearLoading/LinearLoading";
import config from "../configuration/ApiConfig";
import CategorySlider from "../CategorySlider/CategorySlider";
import {categoriesFromConfig} from "../configuration/ApiConfig";

export const Products = () => {
  const baseURL = config.baseURL;

  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");
  
  const [perPage, setPerPage] = useState(30);

  const [categories, setCategories] = useState(categoriesFromConfig);

  const [products, setProducts] = useState([]);

  const getProducts = async (category) => {
    setIsLoading(true);
    setProducts([]);
    const productAPI = baseURL + "/sazgt/products?" + category;
    const response = await fetch(productAPI);
    const responseData = await response.json();
    setProducts(responseData.data);
    console.log(responseData.data)
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts(searchParams);
  }, [searchParams]);

  const handleNavigate = (event) => {
    const { name } = event.target;
    setSearchParams({ category: name });
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
      <CategorySlider></CategorySlider>
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
                key={cat} // Assuming 'cat' is unique for each category
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
