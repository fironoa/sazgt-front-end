import React, { useState } from 'react';
import './Snackbar.css'; // Assuming you have some basic CSS for styling

const SnackBar = ({ isOpen, message, type }) => {


  console.log(type);
  const className = `snack-bar${isOpen ? ' show' : ''}`;
  const [bgColor, setBgColor] = useState("#28a745");


  if (!isOpen) return null;

  return (
    <div className={className} style={{backgroundColor: ` ${type === 'error' ? '#d5637d' : '#28a745'}`}}>
      {message}
    </div>
  );
};

export default SnackBar;