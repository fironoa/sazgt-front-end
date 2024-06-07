import React, { useState } from 'react';
import './Carousel.css';

const images = [
    '../../images/c1.jpg',
    '../../images/c2.jpg',
    '../../images/c3.jpg'
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
    return (
        <div className="carousel">
            <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index + 1}`} />
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