import React, { useEffect, useState } from 'react';
import './ProductDisplayDialogue.css'

const ProductDisplayDialogue = ({ product, baseURL, extraImages }) => {

  const [specifications, setSpecifications] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [imagePaths, setImagePaths] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  useEffect(() => {
    const load = () => {
      setSpecifications(product.specifications.split(','));
      setCurrentImage(`${baseURL}/sazgt/images/${product.primaryImageUrl}`);
      setActiveImage(`${baseURL}/sazgt/images/${product.primaryImageUrl}`);
      setImagePaths(extraImages);
    }

    load();
  }, [])

  const handleImageClick = (src) => {
    setActiveImage(src);
    // Assuming setCurrentProductsPrimaryImage is a function you need to call
    setCurrentImage(src);
  };
  return (
    <div className='display_container'>

      <div className='product-image-container'>
        <div className='extra-image-container'>
          {imagePaths.map((image, index) => {
            return (
              <div className='extra-product-image'>
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  style={{
                    border: activeImage === image ? '2px solid #007A87' : 'none',
                  }}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            )
          })}
        </div>
        <div className='main-image-container'>
          <div className='product-image'>
            <img src={currentImage} alt={product.name} />
          </div>
        </div>

      </div>
      <div className='product-details-container'>
        <div className='product-display-details'>
          <h5>{product.name}</h5>
          <p>{product.model}</p>
          <ul style={{ marginTop: '10px' }}><b>Specifications</b>
            {specifications.map(spec => {
              return <li style={{ fontSize: '0.8rem' }}>{spec}</li>
            })}
          </ul>
        </div>
        <button className='product-button-submit'>Enquire</button>

      </div>

    </div>
  )
}

export default ProductDisplayDialogue