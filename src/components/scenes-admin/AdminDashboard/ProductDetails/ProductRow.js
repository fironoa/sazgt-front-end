import React, { useState } from 'react';

const ProductRow = ({ product, baseURL, onEdit }) => {
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
                <td>
                    <button onClick={toggleExpand}>Images</button>
                </td>
                <td>
                    <button onClick={() => onEdit(product)}>Edit</button>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan="9">
                        <div style={{ display: 'flex', gap:'10px', justifyContent: 'center', transition: 'height 0.3s'}}>
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