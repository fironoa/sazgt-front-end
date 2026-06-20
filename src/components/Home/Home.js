import React, { useState, useEffect } from "react";
import Rectangle68 from "../../images/Rectangle68.webp";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CategorySlider from "../CategorySlider/CategorySlider";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import IncrementCounter from "../IncrementCounter/IncrementCounter";
import { categoriesFromConfig, productPageDescription, getSub, toKebabCase, getHomeUrl } from "../configuration/ApiConfig";
import Carousel from "../Carousel/Carousel";
import { Helmet } from "react-helmet";

export const Home = () => {
  const [perPage] = useState(localStorage.getItem("perPage") || "30");
  const navigate = useNavigate();

  const divStyle = {
    backgroundColor: "#F3F3F3",
    paddingBottom: "10vh",
  };

  const styleText = {
    color: "#0097ceff",
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
      <Helmet>
        <title>Labour Camp Furniture Dubai, UAE | Office Furniture Dubai </title>
      </Helmet>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Carousel></Carousel>
      </div>
      <div className="home-container">
        <CategorySlider></CategorySlider>
        <div className={`banner`}>
          <div className="parts">
            <div>
              <h1>Labour Camp Furniture and Office Furniture
                <span style={styleText}>&nbsp;Solutions!</span>
              </h1>

            </div>
            <div className="description">
              <p align="justify">
                At Sahil - Al-Zuhoor General Trading L.L.C, founded in 2007 in
                Dubai, we specialize in providing high-quality labour camp
                furniture in Dubai and the UAE, as well as comprehensive office
                furniture solutions. As a leading labour camp furniture supplier
                in Dubai and the UAE, our product line includes robust and
                durable steel bunk beds, single beds, steel locker cabinets, and
                medical-grade mattresses, ideal for labour camp accommodations.
                We also offer secure steel lockers and file cabinets for offices
                and labour camps near you. In addition to labour camp furniture,
                we supply office furniture in Dubai and the UAE, including
                pantry tables and chairs, training chairs and tables, and other
                workplace essentials like water coolers, cast iron stoves, and
                coin-operated washing machines. Whether you need steel lockers
                near you for secure storage or labour camp furnishings in Dubai,
                our products are designed for durability and versatility to meet
                both residential and industrial needs.
              </p>
            </div>
            <div className="count-box">
              <div className="count">
                <div className="number">
                  <IncrementCounter target={867}></IncrementCounter>
                </div>
                <div className="number-label">
                  <h5>Clients</h5>
                </div>
              </div>
              <div className="count">
                <div className="number">
                  <IncrementCounter target={160578}></IncrementCounter>
                </div>
                <div className="number-label">
                  <h5>Product Sold</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="parts">
            <div className="banner-image-wrapper">
              <img
                src={"/images/TopBunkImage.webp"}
                width="100%"
                alt="Bunk beds"
              />
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
                <a
                  href={`${getHomeUrl()}/products/${toKebabCase(
                    category
                  )}/${toKebabCase(getSub(category))}`}
                >
                  <div className="tile">
                    <div className="tile-img">
                      <img
                        width="100%"
                        src={
                          "/images/" + category.replace(/\s+/g, "") + ".webp"
                        }
                        alt={category}
                      />
                    </div>
                    <div className="product-name">
                      <h2 style={{ fontSize: "1.2rem" }}>{category}</h2>
                      <p align="justify">{productPageDescription[category]}</p>
                    </div>
                  </div>
                </a>
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
                    Introducing Hassle-Free Laundry: Our New{" "}
                    <span style={{ whiteSpace: "nowrap" }}>Coin-Operated</span>{" "}
                    Washing Machines
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
                <a href="#contact-us-section" className="leave-message-link">
                  Leave a Message
                </a>
              </div>
            </div>
            <div className="latest-arrivals-parts">
              <div className="arrivals-image-wrapper">
                <img
                  src={Rectangle68}
                  alt="latest-arrival-coin-operated-washing-machine"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
