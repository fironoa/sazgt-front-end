import React, { useState } from 'react';
import SnackBar from '../../Snackbar/Snackbar';
import logodraft1 from "../../../images/logodraft1.png";
import './login.css'

function Login() {

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');


  const showSnackBar = (message) => {
    setMessage(message);
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000); // Close the snack bar after 3 seconds
  };



  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);
    switch (name) {
      case 'username':
        setusername(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }




  const handleLogin = () => {
    const data = {
      email: username,
      password: password
    }

    console.log(data);

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
        showSnackBar("Authentication Successfull");
        localStorage.setItem('accessToken', data.accessToken);
        // Handle success here (e.g., show success message, redirect)
        window.location.href = "admin-dashboard"
      })
      .catch(error => {
        console.error('Error:', error);
        showSnackBar("Authentication Failed");
        // Handle errors here (e.g., show error message)
      });
  }

  return (
    <>
      <div className='login-form-container'>
        <div className='login-form-wrapper'>
        <img src={logodraft1} alt="Logo" width="270px" />
          <p>Login to view Sazgt Admin Dashboard</p>
          <input className='form-inputs' type="text" name='username' placeholder='Username' onChange={handleChange} />

          <input className='form-inputs' type="text" name='password' placeholder='password' onChange={handleChange} />

          <div className='login-button' onClick={handleLogin}><span>Login</span></div>

        </div>
      </div>
      <SnackBar isOpen={snackBarOpen} message={message} />
    </>
  )
}

export default Login