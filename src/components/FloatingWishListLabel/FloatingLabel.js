import React, { useEffect, useState } from 'react';
import { IoArrowForward } from "react-icons/io5";
import './FloatingLabel.css';
import { FaRegHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const FloatingLabel = () => {
    const getSelectedItems = () => {
        return JSON.parse(localStorage.getItem('selectedItems') || '[]');
    };

    const location = useLocation();
    const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('selectedItems') || '[]'));
    const [isVisible, setIsVisible] = useState(false);
    const [isOnWishList, setIsOnWishList] = useState(false);

    useEffect(() => {
        const handleItemsUpdate = () => {
            const items = getSelectedItems();
            setSelectedItems(items);
            setIsVisible(items.length > 0);

            // Wait a bit before sliding in to ensure visibility change is noticeable
            setTimeout(() => {
                setIsVisible(items.length > 0);
            }, 100); // Adjust timing as necessary
        };

        window.addEventListener('selectedItemsUpdated', handleItemsUpdate);

        // Initial check in case there are items on first load
        handleItemsUpdate();

        return () => {
            window.removeEventListener('selectedItemsUpdated', handleItemsUpdate);
        };
    }, []);

    useEffect(() => {
        const handleIsOnWishList = () => {
            if(location.pathname == '/wish-list'){
                setIsOnWishList(true);
            } else {
                setIsOnWishList(false);
            }
        }

        handleIsOnWishList();
    }, [location])

    const divStyle = {
        right: isVisible && !isOnWishList ? '0px' : '-200px', // Adjust this to slide from the right
    };

    return (
        <Link style={divStyle} className="floatingLabel" to="/wish-list">
           <FaRegHeart className="icon-properties" /> 
           <p>
                {selectedItems.length}&nbsp;&nbsp;item{selectedItems.length > 1 ? "s" : ""}
           </p>
           <IoArrowForward className='icon-properties'/>
        </Link>
    );
}

export default FloatingLabel