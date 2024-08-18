import React from 'react'
import "./aboutUs.css";

function aboutUs() {
  const aboutUsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "35px"
  }

  
  return (
    <>
      <div className="home-container">
        <div className="footer-heading">
          <h2 id="contact-us-section">About Us</h2>
          <div className="heading-boarder"></div>
        </div>
        <div className="description" style={aboutUsStyle}>
          <div>
            <h3>Sahil-Al-Zuhoor General Trading L.L.C</h3><br />
            <p align="justify">
              Established in the year 2007 with its corporate base at Dubai, SAZ General Trading is one of the leading and eminent business enterprises in the field of providing complete range of staff accommodation and office comfort solutions. With rich industry experience we have established ourselves as one of the most trusted names in the region. Our wide range of products is known for its high performance, robust design and low maintenance ensuring a hassle free experience.
            </p>
          </div>
          <div>
            <h4>Why Choose Us?</h4><br />
            <p align="justify">
              We offer a wide range of products for staff accommodation & office comfort solutions for small, medium and large organizations. Our in-depth know-how of the industry has not only been the key to successfully serve our customers but also to overcome challenges and invest in opportunities for product innovation. With and expanding logistics network, we promise to deliver your products in a timely manner and tour covenience. Last but not the least, we have a dedicated team of young, experienced & enthusiastic professionals to serve you better at any point in time while doing business with us.
            </p>
          </div>
          <div>
            <h4>Our Core Values</h4><br />
            <p align="justify">
              As a leader in an industry that is constantly growing, we ensure our full commitment towards quality, trust and integrity which has also helped us achieve a preferred supplier status in the hearts of customers in a very short time.With our ethical business practices and customer - centric approach we are able to establish an esteemed presence in the market.
              Our sourcing support is designed to truly empower all sizes of clients with their desired results.Our engagement model is highly flexible and collaborative.We provide on - demand support or manage complete catrgories.Our source - to - contract services reside on a solid analytical capability, real - time market intelligence, category expertise and state - of - the - art procurements.
            </p>
          </div>
        </div>
        <br />
        <div className="miviStyle">
          <div className="boxStyle">
            <h4>Mission</h4><br />
            <p align="justify">
              Our mission is to be the most customer centric company in the GCC by supplying quality staff accommodation to organizations that help them cater to staff accommodation requirements in the region.
            </p>
          </div>
          <div className="boxStyle">
            <h4>Vission</h4><br />
            <p align="justify">
              Our vision is to be a recognized leader in the GCC through our performance, people and commitment to company's core values. With a growing footprint in the past decade, we continuously strive to statisfy our customers with innovative solutions while maintaining the same philosophy of quality, trust and integrity.
            </p>
          </div>
        </div>
        <br/><br/><br/>
        <div class="imgWrapper">
          <img  className="aboutImage" src={"/images/about-image.jpg"}/>
        </div><br/><br/>
      </div>
    </>
  )
}

export default aboutUs







