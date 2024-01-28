import React from "react";
import Rectangle77 from "../../images/Rectangle77.png";
import washingmachine from "../../images/washingmachine.png";
import lockerCabinet from "../../images/lockerCabinet.png";
import campFurniture from "../../images/campFurniture.png";
import houseHold from "../../images/houseHold.png";
import coporateGifts from "../../images/coporateGifts.png";
import cleaningProducts from "../../images/cleaningProducts.png";
import "./Home.css";

export const Home = () => {
  const divStyle = {
    backgroundColor: "#F3F3F3",
  };

  const styleText = {
    color: "#01AEEF",
  };

  return (
    <>
      <div className="home-container">
        <div className="banner">
          <div className="parts">
            <div>
              <h1>Complete</h1>
              <h1>
                Comfort <span style={styleText}>Solutions!</span>
              </h1>
            </div>
            <div className="description">
              <p>
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
                  <h2>400+</h2>
                </div>
                <div className="number-label">
                  <p>Clients</p>
                </div>
              </div>
              <div className="count">
                <div className="number">
                  <h2>1000+</h2>
                </div>
                <div className="number-label">
                  <p>Product Sold</p>
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
            <div className="categories-heading">
              <h2>Discover more categories</h2>
            </div>
            <div className="product-tiles">
              <div className="tile">
                <img src={washingmachine} />
                <div className="product-name">Washing Machine</div>
              </div>
              <div className="tile">
                <img src={lockerCabinet} />
                <div className="product-name">Locker Cabinet</div>
              </div>
              <div className="tile">
                <img src={campFurniture} />
                <div className="product-name">Camp Furniture</div>
              </div>
              <div className="tile">
                <img src={houseHold} />
                <div className="product-name">House hold Appliances</div>
              </div>
              <div className="tile">
                <img src={coporateGifts} />
                <div className="product-name">Corpoarate Gifts</div>
              </div>
              <div className="tile">
                <img src={cleaningProducts} />
                <div className="product-name">Cleaning Products</div>
              </div>
            </div>
            <div className="view-more-button"></div>
          </div>
        </div>
      </section>
    </>
  );
};
