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

  const [productId, setProductId] = useState(product.id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setIsSelected(selectedItems.includes(product.id));
  }, [product]);

  useEffect(() => {
    const initialLoad = () => {
      if (product.primaryImageUrl == null) {
        setImageAvailable(false);
      }
      setCurrentProductsPrimaryImage(`${baseURL}/sazgt/images/${product.primaryImageUrl}`);
    }
    initialLoad()
  }, []);

  const toggleItem = () => {

    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (selectedItems.includes(productId)) {
      const newItems = selectedItems.filter(itemId => itemId !== productId);
      localStorage.setItem('selectedItems', JSON.stringify(newItems));
      setIsSelected(false);
      window.dispatchEvent(new CustomEvent('selectedItemsUpdated'));
    } else {
      addItem(productId); // Use addItem to add if not already present
    }
  };

  const addItem = (itemId) => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (!selectedItems.includes(itemId)) {
      selectedItems.push(itemId);
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
      setIsSelected(true); // Update the state to reflect the addition
      window.dispatchEvent(new CustomEvent('selectedItemsUpdated'));
    }
  };

  const handleLike = (event, itemId) => {
    event.stopPropagation(); // Prevent click from bubbling up
    toggleItem();
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
          <div className="heart-icon" onClick={(event) => handleLike(event, product.id)}>
            {isSelected ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart color="currentColor" />
            )}
          </div>
        </div>
      </div>
      <ProductModal isOpen={isModalOpen} onClose={closeModal}>
        <ProductDisplayDialogue product={product} baseURL={baseURL} addItem={addItem} />
      </ProductModal>
    </>
  );
};
