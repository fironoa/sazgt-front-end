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

  const [isLoading, setIsLoading] = useState(true);

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
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Product request failed with status ${response.status}`);
      }
      const responseData = await response.json();
      setProducts(Array.isArray(responseData.data) ? responseData.data : []);
      setPaginationLinks(responseData.links || null);
      setSecondLastPage((responseData.last_page || 1) - 2);
    } catch (error) {
      console.error("Unable to load products:", error);
      setProducts([]);
      setPaginationLinks(null);
    } finally {
      setIsLoading(false);
    }
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
  

  const routeCategory = getTheCategoryBykebabCase(category) || selectedCategory || "Camp Furniture";
  const routeSubCategory = getTheCategoryBykebabCase(subCategory) || selectedSubCategory || "items";
  const routeKey = `${category}/${subCategory}`;
  const pageSeo = {
    "camp-furniture/bunk-beds": {
      heading: "Bunk beds",
      description: "Sahil Al Zuhoor General Trading LLC supplies steel bunk beds for labour camps, staff accommodation, workforce housing and industrial facilities in Dubai and across the UAE. Our range offers practical, space-saving sleeping solutions for businesses, contractors and accommodation providers. Explore our available bunk bed models to find suitable options for your project. Contact our team for product specifications, bulk orders and quotations.",
    },
    "camp-furniture/single-beds": {
      heading: "Single Beds",
      description: "Discover practical single beds from Sahil Al Zuhoor General Trading LLC, suitable for labour camps, staff accommodation, workforce housing and shared residential facilities. Our single-bed range supports businesses and facility managers looking to furnish accommodation spaces efficiently. Browse the available models and contact our team in Dubai for product details, availability and bulk-order quotations.",
    },
    "camp-furniture/steel-lockers": {
      title: "Steel Lockers Dubai, UAE | Sahil Al Zuhoor",
      heading: "Steel Lockers",
      description: "Sahil Al Zuhoor General Trading LLC offers steel storage lockers for labour camps, staff accommodation, workplaces and industrial facilities. These storage solutions help organise personal belongings and make better use of shared spaces. Explore our available locker models for your accommodation or commercial project. Contact our Dubai team for product specifications, availability and bulk-order enquiries.",
    },
    "camp-furniture/shoe-racks": {
      heading: "Shoe Racks",
      description: "Explore practical shoe racks from Sahil Al Zuhoor General Trading LLC for labour camps, staff accommodation, shared housing and workplace facilities. Designed to support organised shoe storage, these products are suitable for accommodation providers, contractors and businesses furnishing common areas. Browse our available models and contact us for product details, pricing and bulk-order enquiries across Dubai and the UAE.",
    },
    "camp-furniture/dining-table-and-chairs": {
      heading: "Dining Tables and Chairs",
      description: "Sahil Al Zuhoor General Trading LLC supplies dining tables and chairs for labour camps, staff cafeterias, employee accommodation and shared dining areas. Our range offers practical furniture options for businesses, contractors and facility managers furnishing dining spaces for their teams. Explore the available products and contact our Dubai team for specifications, availability and quotations for your project.",
    },
    "office-furniture/office-chairs": {
      heading: "Office Chairs",
      description: "Sahil Al Zuhoor General Trading LLC offers office chairs for corporate offices, commercial workspaces, reception areas and professional environments in Dubai and across the UAE. Explore our range of seating options for employees, managers and visitors, suitable for everyday office use and workspace furnishing projects. Contact our team for product specifications, availability, bulk orders and quotations.",
    },
    "office-furniture/office-desks": {
      title: "Office Desks Dubai, UAE | Sahil Al Zuhoor",
      heading: "Office Desks",
      description: "Discover office desks from Sahil Al Zuhoor General Trading LLC for businesses, corporate offices and commercial workspaces in Dubai and across the UAE. Our range provides practical furniture solutions for workstations, individual offices and administrative areas. Whether you are furnishing a new office or upgrading an existing workspace, browse our available models and contact us for product details, pricing and bulk-order enquiries.",
    },
    "office-furniture/work-stations": {
      heading: "Office Workstations",
      description: "Sahil Al Zuhoor General Trading LLC supplies office workstations for businesses looking to organise and furnish productive work environments. Suitable for corporate offices, administrative departments and commercial spaces, our workstation range helps businesses plan functional employee work areas. Explore the available designs for your office project in Dubai and across the UAE. Contact our team for specifications, availability and quotations.",
    },
    "office-furniture/cabinets": {
      heading: "Office Cabinets",
      description: "Find practical office cabinets from Sahil Al Zuhoor General Trading LLC for storing documents, office supplies and workplace essentials. Our office storage furniture is suitable for corporate offices, commercial establishments and administrative environments in Dubai and across the UAE. Browse the available cabinet models and contact our team for product specifications, storage options, availability and bulk-order quotations.",
    },
    "office-furniture/meeting-tables": {
      heading: "Meeting Tables",
      description: "Sahil Al Zuhoor General Trading LLC offers meeting tables for conference rooms, corporate offices, boardrooms and collaborative workspaces. Our range provides practical furniture options for business meetings, team discussions and professional gatherings. Whether you are furnishing a new meeting room or upgrading your office, explore the available products and contact our Dubai team for details, availability and project quotations.",
    },
    "office-furniture/airport-benches": {
      title: "Airport Benches Dubai, UAE | Sahil Al Zuhoor",
      heading: "Airport Benches",
      heading: "Airport Benches and Waiting Area Seating",
      description: "Sahil Al Zuhoor General Trading LLC offers airport benches and waiting-area seating solutions for public spaces, commercial facilities and passenger waiting areas. These seating options are suitable for projects requiring organised seating in high-traffic environments. Explore our available products for airport, transport and institutional furnishing requirements in Dubai and across the UAE. Contact our team for product specifications, availability and bulk-order enquiries.",
    },
    "office-furniture/reception-tables": {
      title: "Reception Tables Dubai, UAE | Sahil Al Zuhoor",
      heading: "Reception Tables",
      description: "Create a welcoming first impression with reception tables from Sahil Al Zuhoor General Trading LLC. Suitable for office reception areas, corporate establishments, commercial buildings and customer-facing spaces, our reception furniture helps create an organised and professional entrance area. Explore the available models for your business premises in Dubai and across the UAE. Contact our team for product information, availability and quotations.",
    },
    "outdoor-furnitures/sunbeds": {
      title: "Outdoor Sunbeds Dubai, UAE | Sahil Al Zuhoor",
      heading: "Outdoor Sunbeds",
      description: "Browse outdoor sunbeds for commercial and leisure spaces in Dubai and across the UAE. Contact Sahil Al Zuhoor for product details and a quote.",
    },
    "swimming-pool-furniture/sunbeds": {
      title: "Swimming Pool Sunbeds Dubai, UAE | Sahil Al Zuhoor",
      heading: "Swimming Pool Sunbeds",
      description: "Explore swimming pool sunbeds for hotels, resorts and leisure facilities in Dubai and across the UAE. Contact Sahil Al Zuhoor for specifications and a quote.",
    },
  };
  const pageDescription = pageSeo[routeKey]?.description || (
    routeSubCategory !== "items"
      ? `Explore ${routeSubCategory.toLowerCase()} from our ${routeCategory.toLowerCase()} range in Dubai and across the UAE. Contact Sahil Al Zuhoor for product details and a quote.`
      : productPageDescription[routeCategory]
  );
  const pageTitle = pageSeo[routeKey]?.title || (
    routeSubCategory !== "items"
      ? `${routeSubCategory} | ${routeCategory} Dubai, UAE | Sahil Al Zuhoor`
      : `${routeCategory} Dubai, UAE | Sahil Al Zuhoor`
  );
  const pageHeading = pageSeo[routeKey]?.heading || (
    routeSubCategory !== "items" ? routeSubCategory : routeCategory
  );
  const canonicalUrl = `https://sazgt.com/products/${toKebabCase(routeCategory)}/${toKebabCase(routeSubCategory)}`;
  const noProductsImage = (
    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', minHeight: '40vh', width: '100%' }}>
      <img src={noCartImage} alt="" style={{ maxWidth: '50%', maxHeight: '50%', width: 'auto', height: 'auto' }} />
      <div style={{ maxWidth: "560px", padding: "24px", textAlign: "center" }}>
        <h2>{pageHeading}</h2>
        <p>Contact our team to check current options, confirm product specifications, or request a quote.</p>
        <a href="/contact">Contact Sahil Al Zuhoor</a>
      </div>
    </div>
  );

  return (
    <div className="product-container">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sahil Al Zuhoor" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://sazgt.com/images/TopBunkImage.webp" />
        <meta name="twitter:card" content="summary_large_image" />
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
            <h1 style={{ fontSize: "1.3rem" }}>{pageHeading}</h1>
            <p>{pageDescription}</p>
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
