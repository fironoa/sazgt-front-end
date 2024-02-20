import React, { useEffect, useState } from "react";
import "./WishlistProductTile.css";
import { FaRegTrashAlt } from "react-icons/fa";
import config from "../configuration/ApiConfig";
import defaultImage from "../../images/defaultImage.png";


function WishlistProductTile({ product, updateProducts }) {


  const [currentProductsPrimaryImage] =
    useState(`${config.baseURL}/sazgt/images/${product.primaryImageUrl}`);


  const [imageAvailable, setImageAvailable] = useState(true);

  useEffect(() => {
    const initialLoad = () => {
      if (product.primaryImageUrl === null) {
        setImageAvailable(false);
      }
    };
    initialLoad();
  });

  const handleDeleteItemFromWishList = () =>{
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (selectedItems.includes(product.id)) {
      const newItems = selectedItems.filter(itemId => itemId !== product.id);
      localStorage.setItem('selectedItems', JSON.stringify(newItems));
      window.dispatchEvent(new CustomEvent('selectedItemsUpdated'));
      updateProducts({ids : newItems});
    }
  }


  return (
    <div>
      <div className="wishlisted-product">
        <div className="details-icon-wrapper">
          <div className="wishlist-product-details">
            <div className="wishlist-product-image">
              {!imageAvailable && (
                <img
                  src={defaultImage}
                  alt={product.name}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              {imageAvailable && (
                <img
                  src={currentProductsPrimaryImage}
                  alt={product.name}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </div>
            <div className="wishlist-product-label">
              <h5>{product.name}</h5>
              <p>{product.model}</p>
            </div>
          </div>
          <div className="delete-icon">
            <FaRegTrashAlt onClick={handleDeleteItemFromWishList}/>
          </div>
        </div>
        <div className="break-line"></div>
      </div>
    </div>
  );
}

export default WishlistProductTile;
