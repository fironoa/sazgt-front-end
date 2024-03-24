import React, { useState, useEffect } from 'react';
import ProductRow from './ProductRow';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../Modal/Modal';
import EditProduct from './EditProduct';

function ProductList({ baseURL }) {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [currentProduct, setCurrentProduct] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const removeProductById = (productId) => {
        // Filter out the product with the matching id
        const updatedProducts = products.filter(product => product.id !== productId);
        // Update the products state
        setProducts(updatedProducts);
    };


    const handleEditClick = (product) => {
        // navigate("/admin-dashboard?op=edit-product&pId=" + productId);
        setCurrentProduct(product);
        openModal();
    };
    const productsAPI = baseURL + '/sazgt/products/get-all';
    
    useEffect(() => {
        // Replace 'your-api-endpoint' with your actual product API endpoint
        //http://localhost:8000/api/sazgt/products?per_page=3


        fetch(productsAPI)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            }) // Adjust based on your API response structur
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div class="content-product-list">

            <h4>Product List</h4><br></br>
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
                            <th>Sub Category</th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product) => (
                            <ProductRow key={product.id} product={product} baseURL={baseURL} 
                            onEdit={handleEditClick} removeProductById={removeProductById}/>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing will go here */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <EditProduct product={currentProduct} />
            </Modal>
        </div>
    );
}

export default ProductList