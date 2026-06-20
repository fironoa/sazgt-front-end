import React from 'react'
import Form from "../Form/Form";
import Map from "../Map/Map";
import SocialMediaLinks from './SocialMediaLinks';

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
                    &nbsp; | Mobile: <a href="tel:+971502737011">+971502737011</a>
                </p>
                <p>E-mail : <a href="mailto:info@sazgt.com">info@sazgt.com</a></p>
                <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", alignItems: "center", marginTop:"10px", gap: "16px", textAlign: "center" }}>
                    Po Box 80982, Al Qusais Industrial area 4, Dubai, UAE
                </address>
            </div>
            <div className="social-media-links-wrapper">
                <SocialMediaLinks></SocialMediaLinks>
            </div>
        </>
    )
}

export default ContactUs


/*


https://www.instagram.com/sazgtuae?igsh=MXdnYzNvdzNsZzdtMA==             S

https://www.linkedin.com/in/sahil-al-zuhoor-general-trading-llc-230a5a256/?originalSubdomain=ae                        S

https://www.facebook.com/p/Sahil-Al-Zuhoor-General-Trading-LLC-100081279017739/


*/