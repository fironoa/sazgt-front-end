import React, { useEffect, useState, useRef  } from 'react';
import { subCategoriesFromConfig, getSub, getTheCategoryBykebabCase, toKebabCase, getHomeUrl } from '../configuration/ApiConfig';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


const SubCategories = ({ category, selectedSubCategory, selectedCategory }) => {

    const subCategories = subCategoriesFromConfig[category] || [];
    const [expanded, setExpanded] = useState(false);
    const subCatWrapperRef = useRef(null); 

    const arrowStyle = { fontSize: "24px", paddingTop: "8px", paddingLeft: "8px" }

    const handleCatClick = (cat) => {
        if (cat !== selectedCategory) {
            setExpanded(!expanded);
        }
        if(subCategories.length <= 0 ){
            setExpanded(false);
        }
    }

    useEffect(() => {
        if ((category === selectedCategory)) {
            setExpanded(true);
        }
        if(subCategories.length <= 0) {
            setExpanded(false);
        }

    }, [])

    useEffect(() => {
        const subCatWrapper = subCatWrapperRef.current;

        if (expanded && subCatWrapper) {
            const scrollHeight = subCatWrapper.scrollHeight;
            subCatWrapper.style.height = `${scrollHeight}px`; // Step 2: Set height dynamically
        } else if (subCatWrapper) {
            subCatWrapper.style.height = '0px';
        }

    }, [expanded, category, selectedCategory]);


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {
                subCategories.length <= 0 ? (
                    <a href = {`${getHomeUrl()}/products/${toKebabCase(category)}/${toKebabCase(getSub(category))}`}
                    className={`anchor-style ${selectedCategory === category ? "active" : ""}`} onClick={() => handleCatClick(category)}>
                        {category}{!expanded ? <IoIosArrowForward style={arrowStyle} /> : <IoIosArrowDown style={arrowStyle} />}
                    </a>
                ) : (
                    <a className={`anchor-style ${selectedCategory === category ? "active" : ""}`} onClick={() => handleCatClick(category)}>
                        {category}{!expanded ? <IoIosArrowForward style={arrowStyle} /> : <IoIosArrowDown style={arrowStyle} />}
                    </a>
                )
            }
            <div  ref={subCatWrapperRef} 
            id={category} className={`sub-cat-wrapper`}
            >
                {subCategories.map(subCategory => {
                    const href = `${getHomeUrl()}/products/${toKebabCase(category)}/${toKebabCase(subCategory)}`;
                    return (
                        <a href={href} className={`anchor-sub-style ${selectedSubCategory === subCategory ? "active" : ""}`}>
                            {subCategory}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default SubCategories;
