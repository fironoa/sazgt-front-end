import React from 'react'
import Form from "../Form/Form";
import Map from "../Map/Map";

const ContactUs = ({ mapToBeShown, toContactRef }) => {
    return (
        <>
            <div className="footer-heading">
                <h2 id="contact-us-section">Contact Us</h2>
                <div className="heading-boarder"></div>
            </div>
            <div style={{gap:"10px", marginBottom:"4vh", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h5>Get in Touch with Sahil-Al-Zuhoor </h5>
                <p align="center" style={{color:"#525252"}}>
                    Whether you have a question about our products or need a custom quote, our team is here to help. Fill out the form below, or reach out to us directly through phone or email. We look forward to providing you with the best furniture solutions for your needs.
                </p>
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
                <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                    <p>E-mail : <a href="mailto:info@sazgt.com">info@sazgt.com</a></p>
                    <p align='center'>Address : Umm Ramool - Dubai - United Arab Emirates</p>
                </address>
            </div>
        </>
    )
}

export default ContactUs