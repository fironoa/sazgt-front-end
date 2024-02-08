import React from "react";
import Rectangle77 from "../../images/Rectangle77.png";
import "./ProductTile.css";
export const ProductTile = () => {
  return (
    <>
      <div className="product-tile">
        <div className="product-image">
          <img src={Rectangle77} width="100%" />
        </div>
        <div className="product-details">
          <div className="product-label">
            <h4>Product Name</h4>
            <p>Model</p>
          </div>
          <div className="heart-icon"></div>
        </div>
      </div>
    </>
  );
};
