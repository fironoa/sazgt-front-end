import React from "react";
import { useState, useEffect, useRef  } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ProductTile } from "./ProductTile";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./Product.css";
import LinearLoading from "../LinearLoading/LinearLoading";
import config from "../configuration/ApiConfig";
import CategorySlider from "../CategorySlider/CategorySlider";
import { categoriesFromConfig } from "../configuration/ApiConfig";
import { Link } from "react-router-dom";
import noCartImage from "../../images/emptyCart.png";


export const Products = () => {
  const baseURL = config.baseURL;
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const [perPage, setPerPage] = useState(15);

  const [categories, setCategories] = useState(categoriesFromConfig);

  const [products, setProducts] = useState([]);

  const [paginationLinks, setPaginationLinks] = useState(null);

  const topElemenrRef = useRef(null);

  const noProductsImage = (
    <div style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <img src={noCartImage} alt="No products found" style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }} />
      <h5><span style={{color:"#ddd"}}>No Products Found</span></h5>
    </div>
  );

  const getProducts = async (searchParams) => {
    setIsLoading(true);
    setProducts([]);
    const productAPI = baseURL + "/sazgt/products?" + searchParams;
    console.log(productAPI);
    const response = await fetch(productAPI);
    const responseData = await response.json();
    setProducts(responseData.data);
    console.log(responseData.links);
    setPaginationLinks(responseData.links);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts(searchParams);
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("perPage", perPage);
  }, [perPage]);

  const handleNavigate = (event) => {
    const { name } = event.target;
    setSearchParams({ category: name, per_page: perPage.toString() });
  };

  const handlePageChange = (url) => {
    if (!url) return; // If the URL is null (e.g., for the active page or unavailable navigation), do nothing

    const urlObj = new URL(url);
    const page = urlObj.searchParams.get("page");
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Update the page parameter
    newSearchParams.set("page", page);

    // Optionally update per_page if needed
    newSearchParams.set("per_page", perPage);

    setSearchParams(newSearchParams);
    topElemenrRef.current.focus();
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

    const { id } = event.target;
    const value = parseInt(id);
    setPerPage(value);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("per_page", value.toString());

    newSearchParams.set("page", "1");

    setSearchParams(newSearchParams);
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
            <button className={`dropbtn`} onClick={handleClick} ref={topElemenrRef}>
              {perPage} Products
              <FaChevronDown className={`chevron ${rotate ? "rotate" : ""}`} />
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <p id="2" onClick={handlePerPage}>2</p>
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
        <div className={`product-tiles-wrapper${products.length > 0 ?  "" : "-no-product"}`}>
          {isLoading ? (
            <LinearLoading />
          ) : products.length > 0 ? (
            products.map((product, index) => <ProductTile product={product} key={index} />)
          ) : (
            noProductsImage
          )}
        </div>
      </div>
      <div className="pagination">
        {paginationLinks && paginationLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(link.url)}
            disabled={!link.url}
            className={`pagination-div ${link.active ? 'active' : ''}`}
            aria-label={link.label.includes("Previous") ? "Previous Page" : link.label.includes("Next") ? "Next Page" : `Page ${link.label}`}
          >
            {link.label.includes("Previous") ? <FaChevronLeft /> :
              link.label.includes("Next") ? <FaChevronRight /> :
                link.label}
          </button>
        ))}
      </div>
    </div>
  );
};
