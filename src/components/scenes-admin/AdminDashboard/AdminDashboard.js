import React, { useState, useEffect } from 'react';
import './adminDashboard.css';
import config from '../../configuration/ApiConfig';
import { useSearchParams } from 'react-router-dom';
import ProductDetails from './ProductDetails/ProductDetails';
import Sidebar from './Sidebar/Sidebar';
import ProductList from './ProductDetails/ProductList';
import LinearLoading from '../../LinearLoading/LinearLoading';
import SnackBar from '../../Snackbar/Snackbar';
import EditProduct from './ProductDetails/EditProduct';
import ThumbnailFetcher from '../../Thumbnailcreator/ThumbnailCreator';

function AdminDashboard() {

  const [searchParams] = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messagetype, setMessagetype] = useState('');
  const operation = searchParams.get('op'); // Assuming you have a URL query parameter named 'mode'

  const baseURL = config.baseURL;
  const token = localStorage.getItem('accessToken');

  const showSnackBar = (message, type) => {
    setMessage(message);
    setSnackBarOpen(true);
    setMessagetype(type);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000); // Close the snack bar after 3 seconds
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      setIsLoading(true);
      fetch(baseURL + '/auth/verify', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          showSnackBar("Authenticated Successfully", "success");
          setVerified(true);
        })
        .catch(error => {
          console.error('Error:', error);
          showSnackBar("Authentication failed", "error");
          window.location.href = "auth/admin-login"
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    verifyAuthentication();

  }, []);


  let screen = "add";

  return (
    <>
      {
        isLoading &&
        <LinearLoading></LinearLoading>
      }

      {
        !verified &&
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <h4>Verifying authentication...</h4>
        </div>
      }

      {verified &&
        <div className="container-admin-page">
          <Sidebar />
          {operation === 'add-product' && <ProductDetails />}
          {operation === 'list-product' && <ProductList baseURL={baseURL} />}
          {!operation && <ProductDetails />}
          <ThumbnailFetcher></ThumbnailFetcher>
        </div>
      }
      <SnackBar isOpen={snackBarOpen} message={message} type={messagetype} />
    </>
  )
}

export default AdminDashboard