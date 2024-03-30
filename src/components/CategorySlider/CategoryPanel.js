import React, { useState, useEffect } from 'react';
import { usePanel } from '../Contexts/PanelContext';
import { IoArrowForward } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "./Panel.css";
import { useSearchParams } from "react-router-dom";
import { categoriesFromConfig } from '../configuration/ApiConfig';
import { subCategoriesFromConfig } from '../configuration/ApiConfig';
import { useNavigate } from "react-router-dom";

const CategoryPanel = () => {

    const [searchParams] = useSearchParams();
    const [perPage, setPerPage] = useState(localStorage.getItem("perPage") || "10");

    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category"));

    const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get("sub_category"));

    const [subCategories, setSubCategories] = useState([]);
    const { isPanelOpen, togglePanel } = usePanel();
    const navigate = useNavigate();

    const handleClick = (cat, sub_category) => {
        const url = '/products?category=' + cat + '&per_page=' + perPage + '&sub_category=' + sub_category;
        navigate(url);
        togglePanel();
    };

    const handleCatClick = (cat) => {
        navigate('/products?category=' + cat + '&per_page=' + perPage);
    }

    const handleContactClick = () => {
        navigate('/#contact-us-section');
        togglePanel();
    }
    useEffect(() => {
        setSelectedCategory(searchParams.get("category"));
        setSelectedSubCategory(searchParams.get("sub_category"));
        
    }, [searchParams]);


    useEffect(() => {
        console.log(selectedCategory);
        document.querySelectorAll('.sub-cat-wrapper').forEach(subWrapperElement => {
            
            if (subWrapperElement.id === selectedCategory) {
                
                subWrapperElement.style.height = `${subWrapperElement.scrollHeight}px`;
               
            } else {
                subWrapperElement.style.height = '0';
            }
            console.log(subWrapperElement);

        });
    }, [selectedCategory]);

    
    return (
        <div
            style={{
                position: 'fixed',
                left: isPanelOpen ? '0' : '-100%', // Slide effect
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgb(240, 240, 240, 0.7)',
                backdropFilter: "blur(5px)",
                transition: 'left 0.5s ease',
                zIndex: 1001, // Ensure it's above other content
            }}
        >

            <IoClose style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '40px',
                color: '#007A87',
                cursor: 'pointer'
            }} onClick={togglePanel} />
            <nav style={{
                marginRight: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'end',
                height: '100%',

            }}>
                {/*This i where tyou atart */}
                {categoriesFromConfig.map((cat, index) => (
                    <div style={{ display: "flex", flexDirection: "column" }}><a className={`anchor-style ${selectedCategory === cat ? "active" : ""}`} onClick={() => handleCatClick(cat)}>{cat}</a>
                        <div id = {cat} className={`sub-cat-wrapper ${selectedCategory === cat ? "sub_wrapper_active" : ""}`}>
                            {subCategoriesFromConfig[selectedCategory] && subCategoriesFromConfig[selectedCategory].map((sub_category, index) => (
                                <a key={index}  className={`anchor-sub-style ${selectedSubCategory === sub_category ? "active" : ""}`} onClick={() => handleClick(cat, sub_category)}>{sub_category}</a>
                            ))}
                        </div>
                    </div>
                ))}

                <div className='contact-us-button'>
                    <a
                        href='/#contact-us-section'
                        onClick={handleContactClick}
                        className={`anchor-style`}>Contact Us </a>
                    <IoArrowForward className='icon-properties' />
                </div>
            </nav>
        </div>
    );
}

export default CategoryPanel