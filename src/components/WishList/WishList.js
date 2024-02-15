import React from "react";
import "./WishList.css";
import campFurniture from "../../images/campFurniture.png";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
function WishList() {
  return (
    <>
      <div className="wishlist-container">
        <div className="wislist-heading">
          <h3>Wish list</h3>
          <p>3 Items</p>
        </div>
        <div className="break-line"></div>
        <div className="wishlist-sub-heading">
          <h5>Product Details</h5>
        </div>
        <div className="break-line" style={{ marginBottom: "1vh" }}></div>
        <div clasName="wishlist-wapper">
          <div className="wishlisted-product">
            <div className="details-icon-wrapper">
              <div className="wishlist-product-details">
                <div className="wishlist-product-image">
                  <img
                    src={campFurniture}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="wishlist-product-label">
                  <h5>Product 1 Camp Furniture</h5>
                  <p>Model:465FG</p>
                </div>
              </div>
              <div className="delete-icon">
                <FaRegTrashAlt />
              </div>
            </div>
            <div className="break-line"></div>
          </div>
          <div className="wishlisted-product">
            <div className="details-icon-wrapper">
              <div className="wishlist-product-details">
                <div className="wishlist-product-image">
                  <img
                    src={campFurniture}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="wishlist-product-label">
                  <h5>Product 1 Camp Furniture</h5>
                  <p>Model:465FG</p>
                </div>
              </div>
              <div className="delete-icon">
                <FaRegTrashAlt />
              </div>
            </div>
            <div className="break-line"></div>
          </div>
          <div className="wishlisted-product">
            <div className="details-icon-wrapper">
              <div className="wishlist-product-details">
                <div className="wishlist-product-image">
                  <img
                    src={campFurniture}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="wishlist-product-label">
                  <h5>Product 1 Camp Furniture</h5>
                  <p>Model:465FG</p>
                </div>
              </div>
              <div className="delete-icon">
                <FaRegTrashAlt />
              </div>
            </div>
            <div className="break-line"></div>
          </div>
        </div>
        <div className="browse-email-button">
          <div className="browse-button">
            <IoIosArrowRoundBack />
            <p>Continue Browsing</p>
          </div>
          <div className="email-button">
            <button>Sent Email</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
