import React from "react";
import Rectangle77 from "../../images/Rectangle77.png";
import "./ProductTile.css";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../configuration/ApiConfig";
import defaultImage from "../../images/defaultImage.png";

export const ProductTile = ({ product }) => {
  const baseURL = config.baseURL;
  const [imageAvailable, setImageAvailable] = useState(false);
  const [imagePaths, setImagePaths] = useState([]);
  const [hasFetchedImages, setHasFetchedImages] = useState(false);
  const [liked, setLiked] = useState(false);

  const imageAPI = `${baseURL}/sazgt/products/${product.id}/images`;

  useEffect(() => {
    const fetchImages = () => {
      if (hasFetchedImages) return; // Prevent fetching again if already done

      fetch(imageAPI)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const imageShowAPIBase = `${baseURL}/sazgt/images/`;
          const { foldername, files } = data;
          const newImagePaths = files.map(
            (file) => `${imageShowAPIBase}${foldername}/${file}`
          );
          setImagePaths(newImagePaths);
          setHasFetchedImages(true); // Mark as fetched
        })
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetchImages();
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <>
      <div className="product-tile">
        <div className="product-image">
          <img
            src={imagePaths[0]}
            alt={product.name}
            style={{ width: "100%" }}
          />
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
