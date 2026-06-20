import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
    '../../images/c1.webp',
    '../../images/c2.webp',
    '../../images/c3.webp',
    '../../images/c4.webp'
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [currentIndex]);

    return (
        <div className="carousel">
            <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Camp Furnitures and Office Furnitures ${index + 1}`} />
                ))}
            </div>
            <button className="carousel-button prev" onClick={handlePrevious}>&#10094;</button>
            <button className="carousel-button next" onClick={handleNext}>&#10095;</button>
            <div className="carousel-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
