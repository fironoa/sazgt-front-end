import React, { useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ProductRow = ({ product, baseURL, onEdit, removeProductById }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [imagePaths, setImagePaths] = useState([]);
    const [hasFetchedImages, setHasFetchedImages] = useState(false); // New state to track if images have been fetched
    const imageAPI = `${baseURL}/sazgt/products/${product.id}/images`;


    // Function to fetch images
    const fetchImages = () => {
        if (hasFetchedImages) return; // Prevent fetching again if already done

        fetch(imageAPI)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const imageShowAPIBase = `${baseURL}/sazgt/images/`;
                const { foldername, files } = data;
                const newImagePaths = files.map(file => `${imageShowAPIBase}${foldername}/${file}`);
                setImagePaths(newImagePaths);
                setHasFetchedImages(true); // Mark as fetched
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    // Adjust the onClick handler for the Images button
    const toggleExpand = () => {
        if (!isExpanded) fetchImages(); // Only fetch images when expanding for the first time
        setIsExpanded(!isExpanded);
    };

    const onDelete = () => {
        const runDeleteProduct = () => {
            const isConfirmed = window.confirm('Are you sure you want to delete this product?');
            if (isConfirmed) {
                deleteProduct(product.id);
            }
        }
        runDeleteProduct();
    }

    const deleteProduct = async (pId) => {
        const token = localStorage.getItem('accessToken');
        // Example fetch request; adjust according to your actual API
        const response = await fetch(baseURL + '/sazgt/products/' + pId, {
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                // Other headers can be added here if needed
            }
        });
        const data = await response.json();
        console.log(data);
        alert(data.message);
        removeProductById(pId);
    };




    return (
        <>
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.model}</td>
                <td>{product.specifications}</td>
                <td>{product.tags}</td>
                <td>{product.category}</td>
                <td>{product.sub_category}</td>
                <td>
                    <button className="table-action-buttons" onClick={toggleExpand}><BiShowAlt /> Images</button>
                </td>
                <td>
                    <button className="table-action-buttons" onClick={() => onEdit(product)}><AiOutlineEdit /> Edit</button>
                </td>
                <td>
                    <button className="table-action-buttons" onClick={() => onDelete(product)}><MdOutlineDeleteOutline /> Delete</button>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan="9">
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', transition: 'height 0.3s' }}>
                            {imagePaths.map((imagePath, index) => (
                                <img key={index} src={imagePath} alt={product.name} style={{ width: '100px', height: '100px' }} />
                            ))}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ProductRow;