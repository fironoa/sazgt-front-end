import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import ContactUs from "../Footer/ContactUs/ContactUs";

export default function Contact() {
  const contactDetailsRef = useRef(null);

  return (
    <main className="home-container" style={{ paddingTop: "24px" }}>
      <Helmet>
        <title>Contact Sahil Al Zuhoor | Request a Quote in Dubai</title>
        <meta name="description" content="Contact Sahil Al Zuhoor in Dubai for labour camp, office, school and outdoor furniture enquiries. Call, email or send a quote request." />
        <link rel="canonical" href="https://sazgt.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sahil Al Zuhoor" />
        <meta property="og:title" content="Contact Sahil Al Zuhoor | Request a Quote in Dubai" />
        <meta property="og:description" content="Call, email or send Sahil Al Zuhoor a furniture quote request in Dubai and across the UAE." />
        <meta property="og:url" content="https://sazgt.com/contact" />
        <meta property="og:image" content="https://sazgt.com/images/TopBunkImage.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ContactUs
        mapToBeShown={true}
        toContactRef={contactDetailsRef}
        headingId="contact-page-heading"
        headingLevel="h1"
      />
    </main>
  );
}
