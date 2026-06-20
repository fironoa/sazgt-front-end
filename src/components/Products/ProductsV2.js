import React, { lazy } from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { FaChevronDown } from "react-icons/fa6";
//import { ProductTile } from "./ProductTile";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./Product.css";
import LinearLoading from "../LinearLoading/LinearLoading";
import config from "../configuration/ApiConfig";
import CategorySlider from "../CategorySlider/CategorySlider";
import { categoriesFromConfig, getHomeUrl } from "../configuration/ApiConfig";

import { productPageDescription } from "../configuration/ApiConfig"
import noCartImage from "../../images/emptyCart.png";
import { subCategoriesFromConfig, getTheCategoryBykebabCase, toKebabCase } from '../configuration/ApiConfig';
import { Helmet } from "react-helmet";
const ProductTile = lazy(() => import("./ProductTile"));

export const ProductsV2 = ({ categoryFromRoute, subCategoryFromRoute }) => {
  const baseURL = config.baseURL;
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { category, subCategory } = useParams();

  const [perPage, setPerPage] = useState(30);

  const [categories, setCategories] = useState(categoriesFromConfig);

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [productUrl, setProductUrl] = useState("");

  const [secondLastPage, setSecondLastPage] = useState(null);

  const [paginationLinks, setPaginationLinks] = useState(null);

  const topElemenrRef = useRef(null);


  const [selectedCategory, setSelectedCategory] = useState(getTheCategoryBykebabCase(category));
  const [selectedSubCategory, setSelectedSubCategory] = useState(getTheCategoryBykebabCase(subCategory));


  const noProductsImage = (
    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '40vh', minWidth: '400px' }}>
      <img src={noCartImage} alt="No products found" style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }} />
      <h5><span style={{ color: "#ddd" }}>No Products Found</span></h5>
    </div>
  );

  const setProductUrlEalier = () => {

    const queryParams = {
      category : selectedCategory,
    }
    // Start building the API URL
    let productAPI = `${baseURL}/sazgt/products?category=${selectedCategory}`;

    // Check if selectedSubCategory is not undefined, null, or an empty string
    if (selectedSubCategory !== 'items') {
      productAPI = `${productAPI}&sub_category=${selectedSubCategory}`;
    }
    setProductUrl(`${productAPI}&per_page=${perPage.toString()}&page=${page}`);
  };

  const getProducts = async (url) => {
    setIsLoading(true);
    setProducts([]);
    const response = await fetch(url);
    const responseData = await response.json();
    setProducts(responseData.data);
    setPaginationLinks(responseData.links);
    setSecondLastPage(responseData.last_page - 2);
    setIsLoading(false);
  }

  useEffect(() => {
    setProductUrlEalier();
  }, []);

  useEffect(() => {
    if (productUrl !== "") {
      getProducts(productUrl);
    }
  }, [productUrl]);


  useEffect(() => {
    localStorage.setItem("perPage", perPage);
  }, [perPage]);

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
  };

  const handleNavigateSubCat = (cat, sub_cat) => {
    //setSearchParams({ category: cat, sub_category: sub_cat, per_page: perPage.toString() });

  }
  const handlePageChange = (url) => {
    setProductUrl(url);
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

  const toggleMainMenuCategories = () => {

  }
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

    //const newSearchParams = new URLSearchParams(searchParams.toString());
    //newSearchParams.set("per_page", value.toString());

    //newSearchParams.set("page", "1");

    //setSearchParams(newSearchParams);
    handleRotate();
    toggleDropdown();

  }

  const cleanUrl = (url) => {
    // Parse the URL and separate the base and query parts
    const [baseUrl, queryString] = url.split('?');
    
    if (!queryString) {
      // If there is no query string, return the base URL as is
      return baseUrl;
    }
  
    // Parse the query string into an array of key-value pairs
    const params = new URLSearchParams(queryString);
  
    // Filter out any parameters with empty values
    for (let [key, value] of params.entries()) {
      if (!value) {
        params.delete(key);
      }
    }
  
    // Construct the cleaned URL
    const cleanedQueryString = params.toString();
    return cleanedQueryString ? `${baseUrl}?${cleanedQueryString}` : baseUrl;
  }
  

  const title = selectedCategory && selectedCategory !== "rexsrt"
    ? `${selectedCategory} | Sahil Al Zuhoor`
    : `Camp Furniture | Sahil Al Zuhoor`;

  const description = {
    title: selectedCategory && selectedCategory !== "rexsrt"
      ? `${selectedCategory}`
      : `Camp Furniture`,
    text: productPageDescription[selectedCategory && selectedCategory !== "rexsrt"
      ? `${selectedCategory}`
      : `Camp Furniture`]
  }

  return (
    <div className="product-container">
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
                {
                  !subCategoriesFromConfig[cat][0] ? <a
                    href={`/products/${toKebabCase(cat)}/items`}
                  >
                    <button
                      key={cat} // Assuming 'cat' is unique for each category
                      id={cat}
                      name={cat}
                      className={`${selectedCategory === cat ? "active" : ""}`}
                    >
                      {cat}
                      {selectedCategory === cat && <IoIosArrowForward />}
                    </button>
                  </a> :
                    <a href={`${getHomeUrl()}/products/${toKebabCase(cat)}/${toKebabCase(subCategoriesFromConfig[cat][0])}`}>
                      <button
                        key={cat} // Assuming 'cat' is unique for each category
                        id={cat}
                        onClick={() => handleCategory(cat)}
                        name={cat}
                        className={`${selectedCategory === cat ? "active" : ""}`}
                      >
                        {cat}
                        {selectedCategory === cat && <IoIosArrowForward />}
                      </button>
                    </a>
                }

                <div id={cat} className={`sub_cat_wrapper_l ${selectedCategory === cat ? "sub_cat_wrapper_l_active" : ""}`}>
                  {subCategoriesFromConfig[cat] && subCategoriesFromConfig[cat].map((sub_category, index) => (
                    <a href={`${getHomeUrl()}/products/${toKebabCase(cat)}/${toKebabCase(sub_category)}`}>
                      <div
                        key={index}
                        id={sub_category}
                        name={sub_category}

                        className={`sub_anchor_style ${selectedSubCategory === sub_category ? "active" : ""}`}
                      >
                        {sub_category}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div style={{ width: "100%" }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            gap: "10px"
          }}>
            <h1 style={{ fontSize: "1.3rem" }}>{description.title}</h1>
            <p>{description.text}</p>
          </div>
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
                  onClick={() => handlePageChange(cleanUrl(link.url))}
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
