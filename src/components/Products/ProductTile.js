import React from "react";
import Rectangle77 from "../../images/Rectangle77.png";
import "./ProductTile.css";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../configuration/ApiConfig";
import defaultImage from "../../images/defaultImage.png";
import ProductModal from "../ProductModal/ProductModal";
import ProductDisplayDialogue from "../ProductDisplayDialogue/ProductDisplayDialogue";

export const ProductTile = ({ product }) => {
  const baseURL = config.baseURL;
  const [imageAvailable, setImageAvailable] = useState(true);
  const [currentProductsPrimaryImage, setCurrentProductsPrimaryImage] = useState('');
  const [imagePaths, setImagePaths] = useState([]);
  const [liked, setLiked] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const imageAPI = `${baseURL}/sazgt/products/${product.id}/images`;

  useEffect(() => {
    const fetchImages = () => {

      fetch(imageAPI)
        .then((response) => response.json())
        .then((data) => {
          const imageShowAPIBase = `${baseURL}/sazgt/images/`;
          const { foldername, files } = data;
          const newImagePaths = files.map(
            (file) => `${imageShowAPIBase}${foldername}/${file}`
          );
          setImagePaths(newImagePaths);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    const initialLoad = () => {
      if (product.primaryImageUrl == null) {
        setImageAvailable(false);
      }
      setCurrentProductsPrimaryImage(`${baseURL}/sazgt/images/${product.primaryImageUrl}`);
    }
    initialLoad()
    fetchImages();
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleClick = () => {
    openModal();
  }


  return (
    <>
      <div className="product-tile" onClick={handleClick}>
        <div className="product-image">
          {!imageAvailable &&
            <img
              src={defaultImage}
              alt={product.name}
              style={{ width: "100%" }}
            />}
          {imageAvailable &&
            <img
              src={currentProductsPrimaryImage}
              alt={product.name}
              style={{ width: "100%" }}
            />}

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
      <ProductModal isOpen={isModalOpen} onClose={closeModal}>
        <ProductDisplayDialogue product={product} baseURL={baseURL} extraImages={imagePaths} />

      </ProductModal>
    </>
  );
};
