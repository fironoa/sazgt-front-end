import React, { useState, useEffect } from 'react';
import { MdOutlineSort } from "react-icons/md";
import { usePanel } from '../Contexts/PanelContext';

const CategorySlider = () => {
    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 900);
    const [isFixed, setIsFixed] = useState(false);
    const { togglePanel } = usePanel();

    useEffect(() => {
        const handleResize = () => {
            const screenIsSmall = window.innerWidth <= 900;
            setIsScreenSmall(screenIsSmall);
            
        };

        // Initial check and set up event listener for screen resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
        
          const placeholder = document.querySelector('#category-slider-placeholder');
          if (placeholder) {
            const { top } = placeholder.getBoundingClientRect();
            const shouldBeFixed = top <= 0;
            setIsFixed(shouldBeFixed);
          }
        };
    
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Remove scroll event listener on cleanup
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      
    // Adjusted styles to include transition for slide-in effect
    const sliderStyle = {
        height: "45px", 
        padding: "10px",
        paddingRight: "15px",
        width: '130px',
        borderBottomRightRadius: "5px", 
        borderTopRightRadius: "5px",
        display: "flex",
        marginLeft: isFixed ? '0' : "-6vw",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#007A87",
        color: "#fff",
        position: isFixed ? 'fixed' : 'relative',
        top: isFixed ? '20px' : 'auto',
        left: '0', // Start off-screen to the left if shouldSlideIn is true
        zIndex: 1000,
        cursor:'pointer'
    };

    if (!isScreenSmall) {
        return null;
    }

    return (
        <div id="category-slider-placeholder">
            <div style={sliderStyle} onClick={togglePanel}>
                <MdOutlineSort style={{ fontSize: "30px" }} />
                Categories
            </div>
        </div>
    );
};

export default CategorySlider;