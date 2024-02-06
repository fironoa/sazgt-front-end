import React, { useState,  useEffect } from 'react';
import './adminDashboard.css';
import config from '../../configuration/ApiConfig';
import { useSearchParams } from 'react-router-dom';
import ProductDetails from './ProductDetails/ProductDetails';
import Sidebar from './Sidebar/Sidebar';

function AdminDashboard() {

  const [searchParams] = useSearchParams();
  const operation = searchParams.get('op'); // Assuming you have a URL query parameter named 'mode'

  const baseURL = config.baseURL;

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const verifyAuthentication = async () => {
      fetch(baseURL + '/auth/verify', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
          window.location.href = "auth/admin-login"
        });
    };

    verifyAuthentication();

  }, []);


  let screen = "add";

  return (
    <>
      <div className="container-admin-page">
        <Sidebar />
        {operation === 'add-product' && <ProductDetails />}
        {operation === 'list-product' && <div>List products</div>}
        {!operation && <ProductDetails />}
      </div>

    </>
  )
}

export default AdminDashboard