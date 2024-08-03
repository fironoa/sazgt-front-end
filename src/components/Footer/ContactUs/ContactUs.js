import React from 'react'
import Form from "../Form/Form";
import Map from "../Map/Map";

const ContactUs = ({mapToBeShown, toContactRef}) => {
    return (
        <>
            <div className="footer-heading">
                <h2 id="contact-us-section">Contact Us</h2>
                <div className="heading-boarder"></div>
            </div>
            {mapToBeShown && <div className="footer-components-wrapper">
                <Map />
                <Form />
            </div>}
            <div className="company-contact-details" ref={toContactRef}>
                <p align='center'>
                    Telephone: <a href="tel:+97142968177">+97142968177</a> 
                    &nbsp; | FAX: <a href="tel:+97142821973">+97142821973</a> 
                    &nbsp; | Mobile: <a href="tel:+971508362620">+971508362620</a>
                </p>
                <p>E-mail : <a href="mailto:info@sazgt.com">info@sazgt.com</a></p>
            </div>
        </>
    )
}

export default ContactUs