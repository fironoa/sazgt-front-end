import React from 'react'
import './ProductModel.css';
import { IoClose } from "react-icons/io5";

const ProductModal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div className="product-modal-backdrop">
            <div className="product-modal-blur-overlay">
                <button onClick={onClose} className="product-modal-close-button"><IoClose /></button>
                {children}
            </div>
        </div>
    )
}

export default ProductModal