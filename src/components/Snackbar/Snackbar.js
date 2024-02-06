import React from 'react';
import './Snackbar.css'; // Assuming you have some basic CSS for styling

const SnackBar = ({ isOpen, message }) => {

  const className = `snack-bar${isOpen ? ' show' : ''}`;

  if (!isOpen) return null;

  return (
    <div className={className}>
      {message}
    </div>
  );
};

export default SnackBar;