import React, { useState } from 'react';
import SnackBar from '../../Snackbar/Snackbar';
import logodraft1 from "../../../images/logodraft1.png";
import './login.css';
import config from '../../configuration/ApiConfig'


function Login() {

  const baseURL = config.baseURL;

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messagetype, setMessagetype] = useState('');


  const showSnackBar = (message, type) => {
    setMessage(message);
    setSnackBarOpen(true);
    setMessagetype(type);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 2000); // Close the snack bar after 3 seconds
  };

  const loginFormLogo = {
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

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

    fetch(baseURL + '/login', {
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
        showSnackBar("Authentication Successfull", "success");
        localStorage.setItem('accessToken', data.accessToken);
        // Handle success here (e.g., show success message, redirect)
        window.location.href = "/admin-dashboard"
      })
      .catch(error => {
        console.error('Error:', error);
        showSnackBar("Authentication Failed", "error");
        // Handle errors here (e.g., show error message)
      });
  }

  return (
    <>
      <div className='login-form-container'>
        <div className='login-form-wrapper'>
          <div style={loginFormLogo}><img src={logodraft1} alt="Logo" width="100%" /></div>
          <p>Login to view Sazgt Admin Dashboard</p>
          <input className='form-inputs' type="text" name='username' placeholder='Username' onChange={handleChange} required/>

          <input className='form-inputs' type="password" name='password' placeholder='password' onChange={handleChange} required/>
          <div className='login-button' onClick={handleLogin}><span>Login</span></div>

        </div>
      </div>
      <SnackBar isOpen={snackBarOpen} message={message} type={messagetype} />
    </>
  )
}

export default Login