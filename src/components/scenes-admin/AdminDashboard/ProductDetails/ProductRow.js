import React, { useState, useEffect } from 'react';


const ProductRow = ({ product, baseURL, onEdit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [imagePaths, setImagePaths] = useState([]);
    const imageAPI = baseURL + '/sazgt/products/' + product.id + '/images';

    useEffect(() => {
        // Replace 'your-api-endpoint' with your actual product API endpoint
        setImagePaths([]);
        

        fetch(imageAPI)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                // Define your base URL
                const imageShowAPIBase = baseURL + '/sazgt/images/';

                // Destructure foldername and files from the response object
                const { foldername, files } = data;

                // Create new paths by appending base URL, folder name, and file name
                const newImagePaths = files.map(file => `${imageShowAPIBase}${foldername}/${file}`);

                // Update the imagePaths state with these new paths
                setImagePaths(currentPaths => [...currentPaths, ...newImagePaths]);


            }) // Adjust based on your API response structur
            .catch(error => console.error('Error fetching data:', error));
    }, []);


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
                    <button onClick={() => setIsExpanded(!isExpanded)}>Images</button>
                </td>
                <td>
                    <button onClick={() => onEdit(product)}>Edit</button>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan="9">
                        {/* Assuming images are comma-separated, adjust if stored differently */}
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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

export default ProductRow