import React, { useState, useEffect } from "react";
import Rectangle68 from "../../images/Rectangle68.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CategorySlider from "../CategorySlider/CategorySlider";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import IncrementCounter from "../IncrementCounter/IncrementCounter";
import { categoriesFromConfig } from "../configuration/ApiConfig";
import Carousel from "../Carousel/Carousel";

export const Home = () => {
  const [perPage] = useState(localStorage.getItem("perPage") || "30");
  const navigate = useNavigate();

  const divStyle = {
    backgroundColor: "#F3F3F3",
    paddingBottom: "10vh",
  };

  const styleText = {
    color: "#01AEEF",
  };

  const headingContentCenter = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2vh",
    marginTop: "10vh",
    marginBottom: "5vh",
  };
  const subHeadingLatestArrival = {
    display: "flex",
    flexDirection: "column",
    gap: "3vh",
  };
  const arrowIcon = {
    display: "flex",
    gap: "10px",
    fontSize: "1rem",
  };

  const handleClick = (cat) => {
    const url = '/products?category=' + cat + '&per_page=' + perPage;
    navigate(url);
  };


  return (
    <div>
      <div style={{display:"flex", justifyContent:"center"}}><Carousel></Carousel></div>
      <div className="home-container">
        <CategorySlider></CategorySlider>
        <div className={`banner`}>
          <div className="parts">
            <div>
              <h1>Complete</h1>
              <h1>
                Comfort <span style={styleText}>Solutions!</span>
              </h1>
            </div>
            <div className="description">
              <p align="justify">
                Sahil - Al- Zuhoor General Trading L.L.C, founded in 2007 in
                Dubai, offers a wide range of office and industry comfort
                solutions, specializing in furniture and comprehensive staff
                accommodation furnishings. Their products are celebrated for
                their robust design, durability, and versatility.
              </p>
            </div>
            <div className="count-box">
              <div className="count">
                <div className="number">
                  <IncrementCounter target={467}></IncrementCounter>
                </div>
                <div className="number-label">
                  <h5>Clients</h5>
                </div>
              </div>
              <div className="count">
                <div className="number">
                  <IncrementCounter target={10578}></IncrementCounter>
                </div>
                <div className="number-label">
                  <h5>Product Sold</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="parts">
            <div className="banner-image-wrapper">
              <img src={"/images/TopBunkImage.jpg"} width="100%" />
            </div>
          </div>
        </div>
      </div>
      <section style={divStyle}>
        <div className="home-container">
          <div className="categories">
            <div style={headingContentCenter}>
              <h2>Discover more categories</h2>
              <div className="heading-boarder"></div>
            </div>
            <div className="tiles-wrapper">
              {categoriesFromConfig.map((category) => (
                <div className="tile" onClick={() => handleClick(category)}>
                  <div className="tile-img">
                    <img
                      width="100%"
                      src={"/images/" + category.replace(/\s+/g, "") + ".jpg"}
                    />
                  </div>
                  <div className="product-name">
                    <p>{category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="home-container">
        <div className="latest-arrivals">
          <div style={headingContentCenter}>
            <h2>Latest Arrivals</h2>
            <div className="heading-boarder"></div>
          </div>
          <div className="latest-arrivals-wrapper">
            <div className="latest-arrivals-parts">
              <div style={subHeadingLatestArrival}>
                <div>
                  <h3>
                    Introducing Hassle-Free Laundry:
                    Our New <span style={{ whiteSpace: "nowrap" }}>Coin-Operated</span> Washing Machines
                  </h3>
                </div>
                <div className="heading-boarder"></div>
              </div>
              <ul>
                <li style={arrowIcon}>
                  <MdKeyboardDoubleArrowRight style={{ marginTop: "5px" }} />
                  Experience the convenience of our latest coin-operated washing
                  machines,
                </li>
                <li style={arrowIcon}>
                  <MdKeyboardDoubleArrowRight style={{ marginTop: "5px" }} />
                  designed to make your laundry tasks easier and more efficient.
                </li>
              </ul>
              <div className="read-more-button">
                <button>
                  <a href="#contact-us-section" style={{ color: "white" }}>Leave a Message</a>
                </button>
              </div>
            </div>
            <div className="latest-arrivals-parts">
              <div className="arrivals-image-wrapper">
                <img src={Rectangle68} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
