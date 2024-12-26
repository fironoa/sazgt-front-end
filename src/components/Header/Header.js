import React from "react";
import { useState, useRef, useEffect } from "react";
import logodraft1 from "../../images/logodraft1.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { getHomeUrl, getTheCategoryBykebabCase, subCategoriesFromConfig, toKebabCase, unwantedSubCatMap } from '../configuration/ApiConfig';
import "./Header.css";
import Navbar from "./Navbar";
import config from "../configuration/ApiConfig";
import LinearLoading from "../LinearLoading/LinearLoading";
import { useSnackbar } from '../Contexts/SnackbarContext';

function Header() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [showNav, setShowNav] = useState(true);
  const [perPage, setPerPage] = useState(localStorage.getItem("perPage") || "30");
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 900);
  const location = useLocation();
  const navRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [openList, setOpenList] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownItems, setDropdownItems] = useState([]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      try {
        // Trigger your search request here
        setIsLoading(true);
        const response = await fetch(config.baseURL + "/sazgt/products/search/" + searchQuery);

        if (!response.ok) {
          // Handle the case where the response is not OK
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Await the JSON parsing

        // Extract unique subcategories
        const uniqueItems = [];
        const uniqueNames = new Set();

        data.forEach(item => {
          if (!uniqueNames.has(item.name)) {
            uniqueNames.add(item.name);
            uniqueItems.push({
              name: item.name,
              category: item.category,
              sub_category: item.sub_category
            });
          }
        });

        if (uniqueItems.length == 0) {
          showSnackbar("No products Found", "info");
        }
        setDropdownItems(uniqueItems.map(item => {
          return {
            searchQuery: item?.name,
            category: item?.category,
            sub_category: item?.sub_category
          };
        }));

        setOpenList(true);
        setIsLoading(false);
      } catch (error) {
        console.error('There was an error with the fetch operation:', error);
      }
    }
  };

  useEffect(() => {
    if (searchQuery == "") {
      setOpenList(false);
    }

  }, [searchQuery])

  useEffect(() => {
    const handleShowNav = () => {
      if (location.pathname == '/admin-dashboard') {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    }
    handleShowNav();
  }, [location])

  useEffect(() => {
    const handleResize = () => {
      const screenIsSmall = window.innerWidth <= 900;
      setIsScreenSmall(screenIsSmall);

    };

    // Initial check and set up event listener for screen resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const handleClick = (cat) => {
    let sub_category = "";
    if (subCategoriesFromConfig[cat] && subCategoriesFromConfig[cat][0] !== undefined) {
      sub_category = subCategoriesFromConfig[cat][0];
    }

    let url = '/products?category=' + cat + '&per_page=' + perPage;
    if (sub_category) {
      url += '&sub_category=' + sub_category;
    }

    navigate(url);
  };



  const handleDropDownListSelection = (item) => {
    /*const subCategory = item.sub_category;
    let url = `/products?category=${item.category}&per_page=${perPage}`;

    if (subCategory) {
      url += `&sub_category=${subCategory}`;
    }*/
      
    const url = `${getHomeUrl()}/products/${toKebabCase(item.category)}/${toKebabCase(
      unwantedSubCatMap.includes(item.sub_category) ? "items" : item.sub_category
    )}`
  
    console.log(url);
    window.location.href = url;
    setOpenList(false);
  }



  return (
    <>
      {isLoading && <LinearLoading></LinearLoading>}
      <div className="container">
        <div className="header">

          <div className="box" style={{ cursor: 'pointer' }}>
            <a href={getHomeUrl()}>
              <img src={logodraft1} alt="Sahil Al Zuhoor" width="270px" />
            </a>
          </div>
          {showNav &&
            <div className="box">
              <div className="search">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown} // Listen for Enter key press
                />
                {openList && dropdownItems && dropdownItems.length > 0 && (
                  <ul className="dropdown-list">
                    {dropdownItems.map((item, index) => (
                      <li key={index} onClick={() => handleDropDownListSelection(item)}>
                        {item.searchQuery}
                        <div style={{ fontSize: "12px", color: "#555" }}>
                          in {item.category}
                          {item.sub_category || item.sub_category == "" ? " > " + item.sub_category : "items"}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          }
          {showNav &&
            <div className="box">
              <div className="contact">
                <div className="icon">
                  <FaPhoneAlt size={12} />
                </div>
                <div className="cont-content">
                  <a href="tel:+971508362620">+971508362620</a>
                </div>
              </div>
              <div className="contact">
                <div className="icon">
                  <IoIosMail size={20} />
                </div>
                <div className="cont-content">
                  <a href="mailto:info@sazgt.com">info@sazgt.com</a>
                </div>
              </div>
              {!isScreenSmall && (
                <div className="contact">
                  <div className="cont-content" style={{ cursor: "pointer" }} onClick={() => navigate('/#contact-us-section')}><p>Contact&nbsp;Us</p></div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
      <div id="line-above-nav-bar" className="line"></div>
      {showNav && <Navbar handleClick={handleClick} showNavbar={showNavbar}></Navbar>}
      <div id="line-below-nav-bar" className="line"></div>
    </>
  );
}

export default Header;
