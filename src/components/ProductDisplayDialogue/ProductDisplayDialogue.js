import React, { useEffect, useState, useRef } from 'react';
import './ProductDisplayDialogue.css'
import SnackBar from '../Snackbar/Snackbar';

const ProductDisplayDialogue = ({ product, baseURL, extraImages, addItem }) => {

  const [specifications, setSpecifications] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [imagePaths, setImagePaths] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [isReadyToContinue, setisReadyToContinue] = useState(false);
  const [continueWithOne, setContinueWithOne] = useState('unknown');
  const [isReadyToTakeContactInfo, setIsReadyToTakeContactInfo] = useState(false);
  const emailBox = useRef(null);
  const radioRef = useRef(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messagetype, setMessagetype] = useState('');

  const focusEmailBox = () => {
    if (emailBox.current) {
      emailBox.current.focus();
    }
  };


  const focusRadioButton = () => {
    console.log(radioRef.current)
    if (radioRef.current) {
      radioRef.current.focus();
    }
  };


  const handleChange = (event) => {

    setContinueWithOne(event.target.value);
    if (event.target.value === 'true') {
      setIsReadyToTakeContactInfo(true);
    } else if (event.target.value === 'false') {
      setIsReadyToTakeContactInfo(false);
    }

  };

  useEffect(() => {
    if(isReadyToTakeContactInfo) {
      focusEmailBox();
    }
  }, [isReadyToTakeContactInfo]);


  useEffect(() => {
    if(isReadyToContinue) {
      focusRadioButton();
    }
  }, [isReadyToContinue])

  const handleEnquiryClick = () => {
    setisReadyToContinue(true);
  }

  const handleContinueClick = () => {
    console.log(continueWithOne);
    if (continueWithOne === 'unknown') {
      alert("Please select an option");
      return null;
    } else if (continueWithOne === 'true') {
      alert("Provide Contact Info");
      setIsReadyToTakeContactInfo(true);
    } else if (continueWithOne === 'false') {
      setIsReadyToTakeContactInfo(false);
      addItem(product.id);
      showSnackBar("Product added to wish List, Continue Browsing", "success");

    }

  }

  const handleSubmitClick = () => {
    alert("Send anemail");
  }


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



  const showSnackBar = (message, type) => {
    setMessage(message);
    setSnackBarOpen(true);
    setMessagetype(type);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000); // Close the snack bar after 3 seconds
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

          {
            isReadyToContinue &&
            <div className='radio-buttons-container'>
              <label className='radio-button-label-input-wrapper'>
                <div>
                  <input
                    ref={radioRef} 
                    type="radio"
                    value="true"
                    checked={continueWithOne === 'true'}
                    onChange={handleChange}
                  />
                </div>
                <div>Continue with this Product.</div>
              </label>
              <label className='radio-button-label-input-wrapper'>
                <div>
                  <input
                    type="radio"
                    value="false"
                    checked={continueWithOne === 'false'}
                    onChange={handleChange}
                  />
                </div>
                <div>Add to wish list and continue browsing.</div>
              </label>

            </div>
          }
        </div>

        {
            isReadyToTakeContactInfo &&
            <form className='product-enuiry-form'>
              <input className='enquiry-form-input' placeholder='email' type='email' required></input>
              <textarea placeholder='Type your Message here Refrain from mentioning sensitive information' required className='enquiry-form-input'></textarea>
              <input ref={emailBox} style={{ backgroundColor: "#007A87" }} className='enquiry-form-input-button' type='submit' value="Send Email"></input>
            </form>
          }
          {!isReadyToContinue && <button className='product-button-submit' onClick={() => handleEnquiryClick(product)}>Enquire</button>}
          {(continueWithOne === 'unknown' || continueWithOne === 'false') && isReadyToContinue && <button className='product-button-submit' onClick={handleContinueClick}>Continue</button>}
          {!isReadyToTakeContactInfo && continueWithOne == 'true' && <button className='product-button-submit' onClick={handleSubmitClick}>Submit</button>}


      </div>
      <SnackBar isOpen={snackBarOpen} message={message} type={messagetype} />
    </div>
  )
}

export default ProductDisplayDialogue