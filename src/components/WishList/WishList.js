import React, { useEffect } from "react";
import "./WishList.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { set } from "react-hook-form";
import config from "../configuration/ApiConfig";
import WishlistProductTile from "./WishlistProductTile";

function WishList() {
  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );
  const [products, setProducts] = useState([]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  useEffect(() => {
    const runGetproducts = () => {
      const data = {
        ids: selectedItems,
      };
      getProducts(data);
    };

    runGetproducts();
  }, []);

  const getProducts = async (data) => {
    console.log(data);
    const productAPI = config.baseURL + "/sazgt/products/by-id";
    console.log(productAPI);
    const response = await fetch(productAPI, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    setProducts(responseData);
  };
  let lastProductId = products.length > 0 ? [products.length] : "0";
  return (
    <>
      <div className="wishlist-container">
        <div className="wislist-heading">
          <h3>Wish list</h3>
          {lastProductId && <h6>{lastProductId} Items</h6>}
        </div>
        <div className="break-line"></div>
        <div className="wishlist-sub-heading">
          <h5>Product Details</h5>
        </div>
        <div className="break-line" style={{ marginBottom: "1vh" }}></div>
        <div clasName="wishlist-wapper">
          {products.map((product) => (
            <WishlistProductTile product={product} />
          ))}
        </div>
        <div className="browse-email-button">
          <div className="browse-button">
            <IoIosArrowRoundBack />
            <p
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/products")}
            >
              Continue Browsing
            </p>
          </div>
          {!isFormVisible && (
            <div className="email-button">
              <button onClick={toggleFormVisibility}>Sent Email</button>
            </div>
          )}
        </div>
        {isFormVisible && (
          <div className="mail-form">
            <div className="email-phone">
              <input placeholder="Email" />
              <input placeholder="Phone Number(Optional)" />
            </div>
            <textarea placeholder="Message" />
            <div className="expanded-button">
              <button>Sent Email</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WishList;
