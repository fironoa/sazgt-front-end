import React from "react";
import Rectangle77 from "../../images/Rectangle77.png";
import "./ProductTile.css";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export const ProductTile = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <>
      <div className="product-tile">
        <div className="product-image">
          <img src={Rectangle77} width="100%" />
        </div>
        <div className="product-details">
          <div className="product-label">
            <h4>{product.name}</h4>
            <p>{product.model}</p>
          </div>
          <div className="heart-icon" onClick={handleLike}>
            {liked ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart color="currentColor" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
