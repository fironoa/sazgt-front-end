import React from "react";
import { useState, useEffect, useRef } from "react";
import Rectangle77 from "../../images/Rectangle77.png";
import washingmachine from "../../images/washingmachine.png";
import lockerCabinet from "../../images/lockerCabinet.png";
import campFurniture from "../../images/campFurniture.png";
import houseHold from "../../images/houseHold.png";
import coporateGifts from "../../images/coporateGifts.png";
import cleaningProducts from "../../images/cleaningProducts.png";
import Rectangle68 from "../../images/Rectangle68.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Footer from "../Footer/Footer";
import CategorySlider from "../CategorySlider/CategorySlider";
import "./Home.css";
import IncrementCounter from "../IncrementCounter/IncrementCounter";

export const Home = () => {

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
    marginTop: "8vh",
  };
  const arrowIcon = {
    display: "flex",
    gap: "10px",
    fontSize: "1rem",
  };

  return (
    <div>
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
              <img src={Rectangle77} width="100%" />
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
              <div className="tile">
                <div className="tile-img">
                  <img src={washingmachine} width="100%" />
                </div>
                <div className="product-name">
                  <p>Washing Machine</p>
                </div>
              </div>
              <div className="tile">
                <div className="tile-img">
                  <img src={lockerCabinet} width="100%" />
                </div>

                <div className="product-name">
                  <p>Locker Cabinet</p>
                </div>
              </div>
              <div className="tile">
                <div className="tile-img">
                  <img src={campFurniture} width="100%" />
                </div>
                <div className="product-name">
                  <p>Camp Furniture</p>
                </div>
              </div>
              <div className="tile">
                <div className="tile-img">
                  <img src={houseHold} width="100%" />
                </div>
                <div className="product-name">
                  <p>House hold Appliances</p>
                </div>
              </div>
              <div className="tile">
                <div className="tile-img">
                  <img src={coporateGifts} width="100%" />
                </div>

                <div className="product-name">
                  <p>Corpoarate Gifts</p>
                </div>
              </div>
              <div className="tile">
                <div className="tile-img">
                  <img src={cleaningProducts} width="100%" />
                </div>

                <div className="product-name">
                  <p>Cleaning Products</p>
                </div>
              </div>
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
                <h3>
                  Introducing Hassle-Free Laundry: Our New Coin-Operated Washing
                  Machines
                </h3>
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
                  <a>Read more</a>
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
