import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ProductRow from './ProductRow';
import './ProductList.css';

function ProductList({ baseURL }) {

    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };
    const productsAPI = baseURL + '/sazgt/products?per_page=40';
    console.log(productsAPI);
    useEffect(() => {
        // Replace 'your-api-endpoint' with your actual product API endpoint
        //http://localhost:8000/api/sazgt/products?per_page=3


        fetch(productsAPI)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data.data);
            }) // Adjust based on your API response structur
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div class="content-product-list">

            <h3>Product List</h3>
            <div className='table-wrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Model</th>
                            <th>Specifications</th>
                            <th>Tags</th>
                            <th>Category</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductRow product={product} baseURL={baseURL} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing will go here */}
        </div>
    );
}

export default ProductList