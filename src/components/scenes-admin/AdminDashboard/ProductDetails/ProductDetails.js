import React, { useState } from 'react';
import { useEffect } from 'react';
import ImageUpload from './ImageUpload';
import LinearLoading from '../../../LinearLoading/LinearLoading';
import SnackBar from '../../../Snackbar/Snackbar';
import config from '../../../configuration/ApiConfig';
import { MdAddBox } from "react-icons/md";
import { FaMinus } from "react-icons/fa";

function ProductDetails() {

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

  const [categories, setCategories] = useState(["chair", "table"]); // For storing categories
  const [newCategory, setNewCategory] = useState(''); // For storing a new category name

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messagetype, setMessagetype] = useState('');



  const addButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#ddd',
    padding: "5px",
    border: '3px solid black',
    width: '100px',
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
      description: model,
      ...(productId !== -1 && { id: productId }),
      // Uncomment and include the file data if needed
      // primaryPhoto: primaryPhoto,
      // secondaryPhoto: secondaryPhoto,
      // extraPhoto1: extraPhoto1,
      // extraPhoto2: extraPhoto2,
      // extraPhoto3: extraPhoto3
    };
    /*formData.append('primaryPhoto', primaryPhoto);
    formData.append('secondaryPhoto', secondaryPhoto);
    formData.append('extraPhoto1', extraPhoto1);
    formData.append('extraPhoto2', extraPhoto2);
    formData.append('extraPhoto3', extraPhoto3);*/
    console.log(data);
    console.log(api);
    const token = localStorage.getItem('accessToken');

    setIsLoading(true);
    // Example: Post formData to a server

    fetch(api , {
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
        setproductId(data.id);
        showSnackBar("Product added/updated Successfully", "success");
        // Handle success here (e.g., show success message, redirect)
      })
      .catch(error => {
        console.error(error);
        if (error.errors) {
          showSnackBar(JSON.stringify(error.errors), "error");
        }
        // Handle errors here (e.g., show error message)
      })
      .finally(() => {
        setIsLoading(false);
      });


  };
  const isProductAdded = productId > -1;

  return (
    <div class="content">
      {isLoading && (<LinearLoading />)}
      <h3 style={{ textAlign: 'left' }}>Product Details</h3>
      <br></br>
      <form className='product-form-layout' onSubmit={handleSubmit}>
        <input type="text" placeholder='name' id='name' name='name' value={name} onChange={handleChange}></input>

        <select name="category" value={category} onChange={handleChange} id='category'>
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
          />
        )}
        <input type="text" value={tags} onChange={handleChange} placeholder='tags' id='tags' name='tags'></input>

        <input type="text" value={model} onChange={handleChange} placeholder='model' id='model' name='model'></input>

        <input type="text" placeholder='description' id='description' name='description' value={description} onChange={handleChange}></input>

        <div className='specifications'>
          <h4>Specifications</h4>
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
          <div style={addButtonStyle} onClick={addSpecificationInput}><MdAddBox className='icon-properties' /> Add </div>
        </div>

        {!isProductAdded &&  <input type="submit" value="Add Product"></input>}

        {isProductAdded &&  <input type="submit" value="Edit this Product"></input>}
      </form>
      <div className='file-controls'>
        <div className='file-inputs-wrapper'>
          {isProductAdded && (<ImageUpload></ImageUpload>)}

        </div>
      </div>
      <SnackBar isOpen={snackBarOpen} message={message} type={messagetype} />
    </div>
  )
}

export default ProductDetails