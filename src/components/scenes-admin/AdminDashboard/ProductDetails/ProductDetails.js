import React, { useState } from 'react';

function ProductDetails() {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [images, setImages] = useState('');


  const handleChange = (event) => {
    const { name, value} = event.target;
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
      case 'images':
        setImages(value);
        break;
      case 'description':
        setDescription(value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      category: category,
      tags: tags,
      model: model,
      specifications: category,
      images: tags,
      description: model,
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

    // Example: Post formData to a server
    fetch('http://localhost:8000/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer 1|ARI0Y5U64cy4iCSMJpRSoouX1Bbu8DbNXJUrCl0n'
        // Other headers can be added here if needed
      }
      // Don't set Content-Type header when using FormData
      // fetch will set it automatically
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Handle success here (e.g., show success message, redirect)
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors here (e.g., show error message)
      });

  };

  return (
    <div class="content">
      <h2>Product Details</h2>
      <form className='product-form-layout' onSubmit={handleSubmit}>
        <input type="text" placeholder='name' id='name' name='name' value={name} onChange={handleChange}></input>

        <input type="text" value={category} onChange={handleChange} placeholder='category' id='category' name='category'></input>

        <input type="text" value={tags} onChange={handleChange} placeholder='tags' id='tags' name='tags'></input>

        <input type="text" value={model} onChange={handleChange} placeholder='model' id='model' name='model'></input>
       
        <input type="text" placeholder='description' id='description' name='description' value={description} onChange={handleChange}></input>

        <input type="text" value={specifications} onChange={handleChange} placeholder='specifications' id='specifications' name='specifications'></input>

        <input type="text" value={images} onChange={handleChange} placeholder='images' id='images' name='images'></input>


        <input type="submit" value="Add Product"></input>
      </form>
      <div className='file-controls'>
        <div className='file-inputs-wrapper'>
          <div><label>Primary photo </label><input type="file" name="primaryPhoto" onChange={handleChange}></input></div>
          <div><label>secondary photo </label><input type="file" name="secondaryPhoto" onChange={handleChange}></input></div>
          <div><label>Extra photo 1 </label><input type="file" name="extraPhoto1" onChange={handleChange}></input></div>
          <div><label>Extra photo 2 </label><input type="file" name="extraPhoto2" onChange={handleChange}></input></div>
          <div><label>Extra photo 3</label><input type="file" name="extraPhoto3" onChange={handleChange}></input></div>
        </div>

        <div>
          box for images show
        </div>
      </div>
    </div>
  )
}

export default ProductDetails