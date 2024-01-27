import React from 'react'
import './adminDashboard.css'
import { MdAddBox } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { FaListUl } from "react-icons/fa";

function AdminDashboard() {
  return (
    <>
      <div className="container-admin-page">
        <div class="sidebar">
          <p>Admin Dashboard</p>
          <div class="active icon-alignment" ><MdAddBox className='icon-properties'/><a href="#home">Add Product</a></div>
          <div class="icon-alignment" ><FaListUl className='icon-properties'/><a href="#home">List Product</a></div>
          <div class="icon-alignment" ><TbLogout2 className='icon-properties'/><a href="#home">Logout</a></div>
        </div>

        <div class="content">
          <h2>Product Details</h2>
          <form className='product-form-layout'>
            <input type="text" placeholder='name'></input>
            <input type="text" placeholder='name'></input>
            
            <input type="text" placeholder='category'></input>
            
            <input type="text" placeholder='tags'></input>
            
            <input type="text" placeholder='model'></input>

            <div className='file-controls'>
              <div className='file-inputs-wrapper'>
                <div><label>Primary photo </label><input type="file" ></input></div>
                <div><label>secondary photo </label><input type="file" ></input></div>
                <div><label>Extra photo 1 </label><input type="file" ></input></div>
                <div><label>Extra photo 2 </label><input type="file" ></input></div>
                <div><label>Extra photo 3</label><input type="file" ></input></div>
              </div>

              <div>
                box for images show
              </div>
            </div>
            <input type="submit" value="Add Product"></input>
          </form>
          
        </div>
      </div>

    </>
  )
}

export default AdminDashboard