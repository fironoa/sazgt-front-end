import React, { useEffect, useState } from 'react'
import { MdAddBox } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { FaListUl } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const op = queryParams.get('op');
  console.log(op);
  const [operation, setOperation] = useState(op === null ? 'add-product' : op);

  const handleLogout = (event) => {
    localStorage.setItem('accessToken', null);
    window.location.href = "auth/admin-login"
  }


  const handleNavigate = (event) => {
    const { name } = event.currentTarget; // Use currentTarget to ensure you get the element the event handler is attached to
    
    switch (name) {
      case "add-product":
        navigate("/admin-dashboard?op=add-product");
        setOperation(name);
        break;
      case "list-product":
        navigate("/admin-dashboard?op=list-product");
        setOperation(name);
        break;
      
    }
  };

  return (
    <div class="sidebar">
          <p>Admin Dashboard</p>
          <button onClick={handleNavigate} id="add-product" name="add-product" className={`icon-alignment ${operation === 'add-product' ? 'active' : ''}`}><MdAddBox className='icon-properties'/>Add Product</button>
          <button onClick={handleNavigate} id="list-product" name="list-product" className={`icon-alignment ${operation === 'list-product' ? 'active' : ''}`}><FaListUl className='icon-properties'/>List Product</button>
          <button className="icon-alignment" onClick={handleLogout}><TbLogout2 className='icon-properties'/>Logout</button>
        </div>
  )
}

export default Sidebar;
