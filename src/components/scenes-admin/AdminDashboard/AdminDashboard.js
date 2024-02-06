import React, { useState,  useEffect } from 'react';
import './adminDashboard.css'

import ProductDetails from './ProductDetails/ProductDetails';
import Sidebar from './Sidebar/Sidebar';

function AdminDashboard() {


  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const verifyAuthentication = async () => {
      fetch('http://localhost:8000/api/auth/verify', {
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
        <ProductDetails />
      </div>

    </>
  )
}

export default AdminDashboard