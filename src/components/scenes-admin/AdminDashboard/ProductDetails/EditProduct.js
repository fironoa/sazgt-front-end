import React, { useState } from 'react';
import { useEffect } from 'react';
import ImageUpload from './ImageUpload';
import LinearLoading from '../../../LinearLoading/LinearLoading';
import SnackBar from '../../../Snackbar/Snackbar';
import config from '../../../configuration/ApiConfig';
import { MdAddBox } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

function EditProduct({ product }) {

    const location = useLocation();

    // Helper function to parse query string
    const queryParams = new URLSearchParams(location.search);

    const baseURL = config.baseURL;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');

    //created as an array
    const [specifications, setSpecifications] = useState(['']);

    const [productId, setproductId] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const [categories, setCategories] = useState([]); // For storing categories
    const [newCategory, setNewCategory] = useState(''); // For storing a new category name

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messagetype, setMessagetype] = useState('');

    const [recentProductImages, setRecentProductImages] = useState([]);

    const [recentlyAddedProduct, setRecentlyAddedProduct] = useState(null);

    const [hasImagesLoaded, setHasImagesLoaded] = useState(false);



    const addButtonStyle = {
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#ddd',
        padding: "1px",
        border: '1px solid black',
        width: '70px',
        cursor: 'pointer'
    }

    const inputAndRemoveControl = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    }
    const showSnackBar = (message, type) => {
        setMessage(message);
        setSnackBarOpen(true);
        setMessagetype(type);
        setTimeout(() => {
            setSnackBarOpen(false);
        }, 3000); // Close the snack bar after 3 seconds
    };

    const handleRemoveImage = (indexToRemove) => {

        const token = localStorage.getItem('accessToken');

        setIsLoading(true);
        // Remove the selected file and its preview by index
        console.log(recentProductImages[indexToRemove]);
        const deleteImage = async () => {
            // Example fetch request; adjust according to your actual API
            const response = await fetch(recentProductImages[indexToRemove], {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            const data = await response.json();

            console.log(data);
            getImages(productId);
            setIsLoading(false);

        };
        const isConfirmed = window.confirm('Are you sure you want to delete this image?');
        if (isConfirmed) {
            deleteImage();
        }
        
    };

    useEffect(() => {
        const getProductById = async () => {
            setIsLoading(true);
            const response = await fetch(baseURL + '/sazgt/products/' + product.id);
            const data = await response.json();
            setRecentlyAddedProduct(data);
            getImages(data.id);

            setName(data.name);
            setCategory(data.category);
            setTags(data.tags);
            setModel(data.model);
            setDescription(data.description);
            setSpecifications(data.specifications.split(','));
            setproductId(data.id);
            setIsLoading(false);
        };
        getProductById();


    }, [])

    const getImages = (pId) => {
        // Replace 'your-api-endpoint' with your actual product API endpoint
        setRecentProductImages([]);
        setHasImagesLoaded(false);
        const imageAPI = baseURL + '/sazgt/products/' + pId + '/images';

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
                setRecentProductImages(currentPaths => [...currentPaths, ...newImagePaths]);


            }) // Adjust based on your API response structur
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setHasImagesLoaded(true));

    }


    useEffect(() => {
        // Fetch categories from your backend or define them statically
        const fetchCategories = async () => {
            // Example fetch request; adjust according to your actual API
            const response = await fetch(baseURL + '/sazgt/products/distinct/categories');

            const data = await response.json();

            console.log(data);
            setCategories(data); // Assuming 'data' is an array of category names
        };

        fetchCategories();
    }, []);



    const handleSpecificationChange = (event, index) => {
        const newSpecifications = specifications.map((specification, specIndex) => index === specIndex ? event.target.value : specification);
        setSpecifications(newSpecifications);
    };

    const addSpecificationInput = () => {
        setSpecifications([...specifications, '']);
    };


    const removeSpecificationInput = (index) => {
        setSpecifications(specifications.filter((_, specIndex) => index !== specIndex));
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'tags':
                setTags(value);
                break;
            case 'model':
                setModel(value);
                break;
            case 'specifications':
                setSpecifications(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'category':
                if (value === "other") {
                    // Handle adding a new category
                    setCategory(''); // Reset or set to default value indicating a new category
                } else {
                    setCategory(value);
                }
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let finalCategory = category === 'other' ? newCategory : category;
        const specificationsStr = specifications.join(',');
        const pId = productId !== -1 ? '/' + productId : '';
        const method = productId !== -1 ? 'PUT' : 'POST';
        const api = baseURL + '/sazgt/products' + pId;

        const data = {
            name: name,
            category: finalCategory,
            tags: tags,
            model: model,
            specifications: specificationsStr,
            description: description,
            ...(productId !== -1 && { id: productId }),
        };

        const token = localStorage.getItem('accessToken');

        setIsLoading(true);
        // Example: Post formData to a server

        fetch(api, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                // Other headers can be added here if needed
            }
            // Don't set Content-Type header when using FormData
            // fetch will set it automatically
        })
            .then(response => {
                if (!response.ok) {
                    // Handle non-200 responses
                    return response.json().then(err => {
                        // Throw an error with the error message or entire error object
                        throw err;
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setRecentlyAddedProduct(data);
                setproductId(data.id);
                showSnackBar("Updated Successfully", "success");
                // Handle success here (e.g., show success message, redirect)
            })
            .catch(error => {
                console.error(error);
                if (error.errors) {
                    showSnackBar(JSON.stringify(error.errors), "error");
                } else if(error.message){
                    showSnackBar(error.message, "error");
                }
                // Handle errors here (e.g., show error message)
            })
            .finally(() => {
                setIsLoading(false);
            });


    };
    const isProductAdded = productId > -1;

    return (
        <>

            <div className="content">
                {isLoading && (<LinearLoading />)}
                <h4 style={{ textAlign: 'left', padding: '15px' }}>Product Details</h4>
                <form className='product-form-layout' onSubmit={handleSubmit} id="product-form">
                    <input type="text" placeholder='name' id='name' name='name' value={name} onChange={handleChange} required></input>

                    <select name="category" value={category} onChange={handleChange} id='category' required>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                        <option value="other">Other...</option>
                    </select>
                    {category === 'other' && (
                        <input
                            type="text"
                            placeholder="Enter new category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            required
                        />
                    )}
                    <input type="text" value={tags} onChange={handleChange} placeholder='tags' id='tags' name='tags'></input>

                    <input type="text" value={model} onChange={handleChange} placeholder='model' id='model' name='model' required></input>

                    <input type="text" placeholder='description' id='description' name='description' value={description} onChange={handleChange}></input>

                    <div className='specifications'>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h5>Specifications</h5>
                            <div style={addButtonStyle} onClick={addSpecificationInput}><MdAddBox className='icon-properties' /> Add </div>
                        </div>
                        {specifications.map((specification, index) => (
                            <div key={index} style={inputAndRemoveControl}>
                                <input
                                    style={{
                                        width: '40vw'
                                    }}
                                    type="text"
                                    value={specification}
                                    onChange={(e) => handleSpecificationChange(e, index)}
                                    placeholder="Specification"
                                    name={`specifications-${index}`}
                                    required
                                />
                                {specifications.length > 1 && (
                                    <FaMinus
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => removeSpecificationInput(index)}
                                    />
                                )}
                            </div>
                        ))}

                    </div>

                    {isProductAdded && <input type="submit" value="Update Product"></input>}


                </form>
                <div className='file-controls'>
                    <div className='file-inputs-wrapper'>
                        {isProductAdded && (<ImageUpload productId={productId} onUpload={getImages}></ImageUpload>)}

                    </div>
                </div>
                <SnackBar isOpen={snackBarOpen} message={message} type={messagetype} />
            </div>
            <div className="content">
                <h4 style={{ textAlign: 'left', padding: '15px' }}>Preview</h4>
                {recentlyAddedProduct == null && <div style={{ textAlign: 'left', padding: '15px' }}>No Product to Display</div>}
                {
                    recentlyAddedProduct !== null &&
                    <div className='product-form-layout'>
                        <table className='table_preview'>
                            <tbody>
                                {Object.entries(recentlyAddedProduct).map(([key, value]) => {
                                    if(key === "id" || key.includes("created") || key.includes("updated") ) return null;
                                    return (
                                        <tr key={key}>
                                            <td style={{fontWeight:'bold'}}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                                            <td>{value}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <br></br>
                        <h5>Images of this product</h5>
                        {!hasImagesLoaded && <div>Loading images ...</div>}
                        {hasImagesLoaded && <div style={{ border: "1px solid #ccc", padding: '10px' }}>
                            {recentProductImages.length == 0 && <div>No Images to display for this product</div>}
                            {recentProductImages.map((image, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    <img src={image} alt={`Selected ${index + 1}`} style={{ width: 100, height: 100 }} />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', background: 'red', color: 'white', border: 'none', padding: '0 4px', margin: '6px 6px' }}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>}
                    </div>
                }
            </div>
        </>
    )
}

export default EditProduct