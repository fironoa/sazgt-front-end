import React, { useState, useEffect } from 'react';
import { usePanel } from '../Contexts/PanelContext';
import { IoArrowForward } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "./Panel.css";
import { useSearchParams } from "react-router-dom";
import { categoriesFromConfig, getAllSub } from '../configuration/ApiConfig';
import { subCategoriesFromConfig, getTheCategoryBykebabCase, toKebabCase, getHomeUrl } from '../configuration/ApiConfig';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SubCategories from './SubCategories';

const CategoryPanel = () => {

    const [searchParams] = useSearchParams();
    const [perPage, setPerPage] = useState(localStorage.getItem("perPage") || "10");

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const [selectedCategory, setSelectedCategory] = useState(getTheCategoryBykebabCase(pathSegments[1]));
    const [selectedSubCategory, setSelectedSubCategory] = useState(getTheCategoryBykebabCase(pathSegments[2]));




    const { isPanelOpen, togglePanel } = usePanel();
    const navigate = useNavigate();

    const handleClick = (cat, sub_category) => {
        const url = '/products?category=' + cat + '&per_page=' + perPage + '&sub_category=' + sub_category;
        navigate(url);
        togglePanel();
    };



    const handleContactClick = () => {
        navigate('/#contact-us-section');
        togglePanel();
    }


    useEffect(() => {
        console.log(selectedCategory + "  " + selectedSubCategory);
    }, [])




    return (
        <div
            style={{
                position: 'fixed',
                left: isPanelOpen ? '0' : '-100%', // Slide effect
                top: 0,
                paddingTop: '30px',
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
                marginTop: '6vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                height: '90vh',
                overflowX: "scroll"

            }}>
                {categoriesFromConfig.map((cat, index) => {
                    console.log(cat);
                    return (
                        <SubCategories
                            key={index}
                            category={cat}
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                        >

                        </SubCategories>
                    )
                })}

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