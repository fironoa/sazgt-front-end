import React from 'react'
import './Modal.css';
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button"><IoClose /></button>
    
        {children}
      </div>
    </div>
      );
}

export default Modal