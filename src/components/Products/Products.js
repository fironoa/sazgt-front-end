import React, { lazy } from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { FaChevronDown } from "react-icons/fa6";
//import { ProductTile } from "./ProductTile";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./Product.css";
import LinearLoading from "../LinearLoading/LinearLoading";
import config from "../configuration/ApiConfig";
import CategorySlider from "../CategorySlider/CategorySlider";
import { categoriesFromConfig } from "../configuration/ApiConfig";
import noCartImage from "../../images/emptyCart.png";
import { subCategoriesFromConfig } from '../configuration/ApiConfig';
const ProductTile = lazy(() => import("./ProductTile"));

export const Products = ({categoryFromRoute}) => {
  const baseURL = config.baseURL;
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const selectedSubCategory = searchParams.get("sub_category");

  const [perPage, setPerPage] = useState(30);

  const [categories, setCategories] = useState(categoriesFromConfig);

  const [products, setProducts] = useState([]);

  const [secondLastPage, setSecondLastPage] = useState(null);

  const [paginationLinks, setPaginationLinks] = useState(null);

  const topElemenrRef = useRef(null);

  const noProductsImage = (
    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '40vh', minWidth: '400px' }}>
      <img src={noCartImage} alt="No products found" style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }} />
      <h5><span style={{ color: "#ddd" }}>No Products Found</span></h5>
    </div>
  );

  const getProducts = async (searchParams) => {
    setIsLoading(true);
    setProducts([]);
    const productAPI = baseURL + "/sazgt/products?" + searchParams;
    const response = await fetch(productAPI);
    const responseData = await response.json();
    setProducts(responseData.data);
    setPaginationLinks(responseData.links);
    setSecondLastPage(responseData.last_page - 2);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts(searchParams);
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ category: categoryFromRoute, per_page: perPage.toString() });
  }, []);

  useEffect(() => {
    localStorage.setItem("perPage", perPage);
  }, [perPage]);

  const handleNavigate = (event) => {
    const { name } = event.target;
    // Assuming subCategoriesFromConfig is an object and perPage is a defined variable
    const queryParams = {
      category: name,
      per_page: perPage.toString()
    };

    // Check if subCategoriesFromConfig[name] exists and has a defined first element
    if (subCategoriesFromConfig[name] && subCategoriesFromConfig[name][0] !== undefined) {
      queryParams.sub_category = subCategoriesFromConfig[name][0];
    }
    setSearchParams(queryParams);
  };

  const handleNavigateSubCat = (cat, sub_cat) => {
    setSearchParams({ category: cat, sub_category: sub_cat, per_page: perPage.toString() });

  }
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

  useEffect(() => {
    document.querySelectorAll('.sub_cat_wrapper_l').forEach(subWrapperElement => {

      if (subWrapperElement.id === selectedCategory) {

        subWrapperElement.style.height = `${subWrapperElement.scrollHeight}px`;

      } else {
        subWrapperElement.style.height = '0';
      }

    });
  }, [selectedCategory]);

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
                <p id="30" onClick={handlePerPage}>30</p>
                <p id="50" onClick={handlePerPage}>50</p>
                <p id="70" onClick={handlePerPage}>70</p>
                <p id="100" onClick={handlePerPage}>100</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sidebar-tiles-wrapper">
        <div className="product-sidebar">
          <p>CATEGORIES</p>
          {categories !== null &&
            categories.map((cat) => (
              <div>
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
                <div id={cat} className={`sub_cat_wrapper_l ${selectedCategory === cat ? "sub_cat_wrapper_l_active" : ""}`}>
                  {subCategoriesFromConfig[cat] && subCategoriesFromConfig[cat].map((sub_category, index) => (
                    <div
                      key={index}
                      id={sub_category}
                      onClick={() => handleNavigateSubCat(cat, sub_category)}
                      name={sub_category}
                      className={`sub_anchor_style ${selectedSubCategory === sub_category ? "active" : ""}`}
                    >
                      {sub_category}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div style={{ width: "100%" }}>
          <div className={`product-tiles-wrapper${(products?.length || 0) > 0 ? "" : "-no-product"}`}>

            {isLoading ? (
              <LinearLoading />
            ) : (products?.length || 0) > 0 ? (
              <Suspense fallback={<div>Loading...</div>}>
                {products.map((product, index) => (
                  <ProductTile product={product} key={index} />
                ))}
              </Suspense>
            ) : (
              noProductsImage
            )}

          </div>
          <div className="pagination">
            {(products?.length || 0) > 0 && paginationLinks && paginationLinks.map((link, index) => {
              if (index > 4 && index < secondLastPage) {
                return null;
              }
              if (index == 4) {
                link.active = false;
                link.label = "...";
                link.url = null;
              }

              return (
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
              )
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
