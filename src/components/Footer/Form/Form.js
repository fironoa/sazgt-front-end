import React, { useState } from "react";
import "./Form.css";
import { useSnackbar } from '../../Contexts/SnackbarContext';
import config from '../../configuration/ApiConfig';
import { sendMail } from '../../api/email';
import { AiOutlineLoading } from "react-icons/ai";

function Form() {

  const [name, setName] = useState();
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
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

    
    setIsLoading(true)
    sendMail(data)
    .then(data => {
      setIsLoading(false)
      showSnackbar(data.message);
    }).catch(error => {
      showSnackbar("Error while Sending mail", "error");
      setIsLoading(false)
    })

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
            {isLoading && (
              <AiOutlineLoading className="loading-icon"/>
            )}
          </button>
        </div>
      </form>
      <style jsx>{`
        .loading-icon {
          margin-left: 8px;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
export default Form;
