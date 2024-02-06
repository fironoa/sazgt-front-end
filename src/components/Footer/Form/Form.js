import React from "react";
import "./Form.css";
function Form() {
  return (
    <>
      <div className="form-component">
        <div className="name-phone">
          <input className="form-input" placeholder="Name"></input>
          <input className="form-input" placeholder="Phone"></input>
        </div>
        <div>
          <input className="form-input" placeholder="Email"></input>
        </div>
        <div>
          <textarea
            className={`form-input form-textarea`}
            placeholder="Message"
          ></textarea>
        </div>
        <div className="message-button">
          <button>
            <a>Send Message</a>
          </button>
        </div>
      </div>
    </>
  );
}
export default Form;
