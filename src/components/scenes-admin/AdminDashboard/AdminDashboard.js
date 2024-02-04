import React from 'react'
import './adminDashboard.css'

import ProductDetails from './ProductDetails/ProductDetails';
import Sidebar from './Sidebar/Sidebar';

function AdminDashboard() {

  let screen = "add";

  return (
    <>
      <div className="container-admin-page">
        <Sidebar/>
        <ProductDetails/>
      </div>

    </>
  )
}

export default AdminDashboard