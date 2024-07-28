import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../configuration/ApiConfig";
import defaultImage from "../../images/defaultImage.png";
import ProductModal from "../ProductModal/ProductModal";
import ProductDisplayDialogue from "../ProductDisplayDialogue/ProductDisplayDialogue";
import "./ProductTile.css";

const ProductTile = ({ product, setIsLoading }) => {
  const baseURL = config.baseURL;
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [imageAvailable, setImageAvailable] = useState(true);
  const [currentProductsPrimaryImage, setCurrentProductsPrimaryImage] = useState('');

  const [productId, setProductId] = useState(product.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setIsSelected(selectedItems.includes(product.id));
  }, [product]);

  useEffect(() => {
    if (product.primaryImageUrl == null) {
      setImageAvailable(false);
    } else {
      setCurrentProductsPrimaryImage(`${baseURL}/sazgt/images/${product.primaryImageUrl}`);
    }
  }, [baseURL, product.primaryImageUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) observer.disconnect();
    };
  }, []);

  const toggleItem = () => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (selectedItems.includes(productId)) {
      const newItems = selectedItems.filter(itemId => itemId !== productId);
      localStorage.setItem('selectedItems', JSON.stringify(newItems));
      setIsSelected(false);
      window.dispatchEvent(new CustomEvent('selectedItemsUpdated'));
    } else {
      addItem(productId);
    }
  };

  const addItem = (itemId) => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (!selectedItems.includes(itemId)) {
      selectedItems.push(itemId);
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
      setIsSelected(true);
      window.dispatchEvent(new CustomEvent('selectedItemsUpdated'));
    }
  };

  const handleLike = (event, itemId) => {
    event.stopPropagation();
    toggleItem();
  };

  const handleClick = () => {
    openModal();
  };

  return (
    <>
      <div className="product-tile" onClick={handleClick}>
        <div className="product-image" ref={imgRef}>
          <img
            src={loaded ? currentProductsPrimaryImage : defaultImage}
            alt={product.name}
            className={`product-img ${loaded ? 'fade-in' : ''}`}
            loading="lazy"
          />
        </div>
        <div className="product-details">
          <div className="product-label">
            <h4 style={{ whiteSpace: 'nowrap'}}>{product.name}</h4>
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
        <ProductDisplayDialogue
          product={product}
          baseURL={baseURL}
          addItem={addItem}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
        />
      </ProductModal>
    </>
  );
};

export default ProductTile;
