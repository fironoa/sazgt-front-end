import React from 'react'
import { MdAddBox } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { FaListUl } from "react-icons/fa";
function Sidebar() {
  return (
    <div class="sidebar">
          <p>Admin Dashboard</p>
          <div class="active icon-alignment" ><MdAddBox className='icon-properties'/><a href="#home">Add Product</a></div>
          <div class="icon-alignment" ><FaListUl className='icon-properties'/><a href="#home">List Product</a></div>
          <div class="icon-alignment" ><TbLogout2 className='icon-properties'/><a href="#home">Logout</a></div>
        </div>
  )
}

export default Sidebar