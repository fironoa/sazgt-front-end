import React, { useState, useEffect } from 'react';
import { usePanel } from '../Contexts/PanelContext';
import { IoClose } from "react-icons/io5";
import "./Panel.css";
import { useSearchParams } from "react-router-dom";
import { categoriesFromConfig } from '../configuration/ApiConfig';
import { useNavigate } from "react-router-dom";

const CategoryPanel = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category"));

    const { isPanelOpen, togglePanel } = usePanel();
    const navigate = useNavigate();

    const handleClick = (cat) => {
        setSearchParams({ category: cat });
    };

    useEffect(() => {
        setSelectedCategory(searchParams.get("category"));
    }, [searchParams]);
    
    return (
        <div
            style={{
                position: 'fixed',
                left: isPanelOpen ? '0' : '-100%', // Slide effect
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgb(240, 240, 240, 0.5)',
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
                marginRight:'30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'end',
                height: '100%',

            }}>
                {/*This i where tyou atart */}
                {categoriesFromConfig.map((cat, index) => (
                    <a className={`anchor-style ${selectedCategory === cat ? "active" : ""}`} onClick={() => handleClick(cat)}>{cat}</a>
                ))}

            </nav>
        </div>
    );
}

export default CategoryPanel