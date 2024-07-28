import React, { useEffect } from "react";
import "./WishList.css";
import { useState } from "react";
import LinearLoading from "../LinearLoading/LinearLoading";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import CategorySlider from '../CategorySlider/CategorySlider';
import config from "../configuration/ApiConfig";
import WishlistProductTile from "./WishlistProductTile";
import noCartImage from "../../images/emptyCart.png";
import { sendMail } from '../api/email';
import { useSnackbar } from '../Contexts/SnackbarContext';

function WishList() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );
  const [products, setProducts] = useState([]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const removeProductById = (productId) => {
    setProducts(currentProducts =>
      currentProducts.filter(product => product.id !== productId)
    );
  };

  const noProductsImage = (
    <div style={{ paddingTop: "6vh", display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <img src={noCartImage} alt="No products found" style={{ maxWidth: '20%', maxHeight: '20%', width: 'auto', height: 'auto' }} />
      <h5><span style={{ color: "#ddd" }}>This wishlist is Empty</span></h5>
    </div>
  );
  useEffect(() => {
    const runGetproducts = () => {
      const data = {
        ids: selectedItems,
      };
      getProducts(data);
    };

    runGetproducts();
  }, []);

  const getProducts = async (data) => {
    setIsLoading(true);
    const productAPI = config.baseURL + "/sazgt/products/by-id";
    const response = await fetch(productAPI, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    setProducts(responseData);
    setIsLoading(false);
  };


  const handleFormInput = (event) => {
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
        setMessage(value);
        break;
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const api = config.baseURL + '/sazgt/sent-email';
    const simplifiedProducts = products.map(({ name, model, category }) => ({
      name,
      model,
      category
    }));

    const data = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      products: simplifiedProducts
    };
    console.log(data);
    setIsLoading(true)
    sendMail(data)
    .then(data => {
      setIsLoading(false)
      showSnackbar(data.message, "info");
    }).catch(error => {
      console.log(error);
      setIsLoading(false)
      showSnackbar("Error while Sending mail", "error");
    })

  };

  let lastProductId = products.length > 0 ? [products.length] : "0";
  return (
    <>
      <div className="wishlist-container">
        <CategorySlider></CategorySlider>
        <div className="wislist-heading">
          <h3>Wishlist</h3>
        </div>
        <div className="break-line"></div>
        <div className="wishlist-sub-heading">
          <h5>Product Details</h5>
          {lastProductId && <h6>{lastProductId} Items</h6>}
        </div>
        <div className="break-line" style={{ marginBottom: "1vh" }}></div>
        <div clasName="wishlist-wapper">

          {isLoading ? (
            <LinearLoading />
          ) : products.length > 0 ? (
            products.map((product) => (
              <WishlistProductTile product={product} updateProducts={removeProductById} setSelectedItems={setSelectedItems} />
            ))
          ) : (

            noProductsImage
          )}
        </div>
        <div className="browse-email-button">
          <div className="browse-button">
            <IoIosArrowRoundBack />
            <p style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
              Continue Browsing
            </p>
          </div>
          {products.length > 0 && !isFormVisible && (
            <div className="email-button">
              <button onClick={toggleFormVisibility}>Send Enquiry</button>
            </div>
          )}
        </div>
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <div className="mail-form">
              <div className="email-phone">
                <input placeholder="Name" name="name" required onChange={handleFormInput} />
                <input placeholder="Email" name="email" required onChange={handleFormInput} type="email" />
                <input placeholder="Phone Number (Optional)" name="phone" onChange={handleFormInput} />
              </div>
              <textarea placeholder="Message" name="message" required onChange={handleFormInput} />
              <div className="expanded-button">
                <button>Send Enquiry</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default WishList;
