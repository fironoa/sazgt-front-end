import React, { useEffect, useState, useRef } from 'react';
import './ProductDisplayDialogue.css'
import SnackBar from '../Snackbar/Snackbar';
import { useSnackbar } from '../Contexts/SnackbarContext';
import { sendMail } from '../api/email';

const ProductDisplayDialogue = ({ product, baseURL, addItem, closeModal, setIsLoading }) => {

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
  const { showSnackbar } = useSnackbar();
  const imageAPI = `${baseURL}/sazgt/products/${product.id}/images`;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [messageMail, setMessageMail] = useState();


  const focusEmailBox = () => {
    if (emailBox.current) {
      emailBox.current.focus();
    }
  };


  const focusRadioButton = () => {
    if (radioRef.current) {
      radioRef.current.focus();
    }
  };

  useEffect(() => {
    const fetchImages = () => {

      fetch(imageAPI)
        .then((response) => response.json())
        .then((data) => {
          const imageShowAPIBase = `${baseURL}/sazgt/images/`;
          const { foldername, files } = data;
          const newImagePaths = files.map(
            (file) => `${imageShowAPIBase}${foldername}/${file}`
          );
          setImagePaths(newImagePaths);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetchImages();
  }, []);

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
    if (continueWithOne === 'unknown') {
      showSnackbar("Select an option", "error");
      return null;
    } else if (continueWithOne === 'true') {
      showSnackbar("Provide Contact information", "error");
      setIsReadyToTakeContactInfo(true);
    } else if (continueWithOne === 'false') {
      setIsReadyToTakeContactInfo(false);
      addItem(product.id);
      //showSnackBar2("Product added to wish List, Continue Browsing", "success");
      showSnackbar("Product added to Wish List", "info");
      closeModal();
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
    }

    load();
  }, [])

  const handleImageClick = (src) => {
    setActiveImage(src);
    // Assuming setCurrentProductsPrimaryImage is a function you need to call
    setCurrentImage(src);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'message':
        setMessageMail(value);
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const productDetail = {
      id : product.id,
      name : product.name,
      model : product.model
    }
    const data = {
      name : name,
      email : email,
      phone : phone,
      message : messageMail,
      product : [
        productDetail
      ]
    };

    setIsLoading(true)
    sendMail(data)
    .then(data => {
      setIsLoading(false)
      showSnackbar(data.message, "info");
    }).catch(error => {
      showSnackbar("Error while Sending mail", "error");
      setIsLoading(false)
    })

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
          <img src={currentImage} alt={product.name} />
        </div>

      </div>
      <div className='product-details-container'>
        <div className='product-display-details'>
          <h5>{product.name}</h5>
          <p>{product.model}</p>
          {/*<ul style={{ marginTop: '10px' }}><b>Specifications</b>
            {specifications.map(spec => {
              return <li style={{ fontSize: '0.8rem' }}>{spec}</li>
            })}
          </ul>*/}

          {
            isReadyToContinue &&
            <div className='radio-buttons-container'>
              <h6>Would you like to ?</h6>
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
            <form className='product-enuiry-form' onSubmit={handleSubmit}>
              <input name="name" className='enquiry-form-input' placeholder='name' onChange={handleFormInputChange} required></input>
              <input name="phone" className='enquiry-form-input' placeholder='phone' onChange={handleFormInputChange} required></input>
              <input name="email" className='enquiry-form-input' placeholder='email' onChange={handleFormInputChange} type='email' required></input>
              <textarea name="message" onChange={handleFormInputChange} placeholder='Type your Message here Refrain from mentioning sensitive information' required className='enquiry-form-input'></textarea>
              <input ref={emailBox} style={{ backgroundColor: "#007A87" }} className='enquiry-form-input-button' type='submit' value="Send Enquiry"></input>
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