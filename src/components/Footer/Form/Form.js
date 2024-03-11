import React, { useState } from "react";
import "./Form.css";
import config from '../../configuration/ApiConfig';

function Form() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name + " " + value);
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'message':
        setMessage(value);
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const api = config.baseURL + '/sazgt/sent-email';
    const data = {
      name: name,
      email: email,
      phone: phone,
      message: message
    };

    alert(JSON.stringify(data));

    // Example: Post formData to a server

    /*fetch(api, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Other headers can be added here if needed
      }
      // Don't set Content-Type header when using FormData
      // fetch will set it automatically
    })
      .then(response => {
        if (!response.ok) {
          // Handle non-200 responses
          return response.json().then(err => {
            // Throw an error with the error message or entire error object
            throw err;
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
       
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
*/

  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-component">
        <div className="name-phone">
          <input className="form-input" name="name" placeholder="Name" required onChange={handleChange}></input>
          <input className="form-input" name="phone" placeholder="Phone" required onChange={handleChange}></input>
        </div>
        <div>
          <input className="form-input" name="email" type="email" placeholder="Email" required onChange={handleChange}></input>
        </div>
        <div>
          <textarea required onChange={handleChange} name="message"
            className={`form-input form-textarea`}
            placeholder="Message"
          ></textarea>
        </div>
        <div className="message-button">
          <button>
            <a>Send Message</a>
          </button>
        </div>
      </form>
    </>
  );
}
export default Form;
