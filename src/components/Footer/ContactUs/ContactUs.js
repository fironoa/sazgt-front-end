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
                    Telephone: +97142808392 | FAX: +97142821973 | Mobile: +97150-8362620
                </p>
                <p>E-mail : info@sazgt.com</p>
            </div>
        </>
    )
}

export default ContactUs