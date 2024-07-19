import React from 'react'
import { useState, useRef, useEffect } from "react";
import { categoriesFromConfig } from "../configuration/ApiConfig";
import { FaTimes } from "react-icons/fa";
const Navbar = ({ handleClick, showNavbar }) => {
    const navRef = useRef();
    return (
        <div className={`navbar-wrapper `}>
            <nav className={`navbar`}>
                <div className={`nav-list`} ref={navRef}>
                    {categoriesFromConfig.map((cat, index) => {
                        return (
                            <a onClick={() => handleClick(cat)}>{cat}</a>
                        )
                    })}
                    <button className={`nav-btn nav-close-btn`}>
                        <FaTimes onClick={showNavbar} />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar