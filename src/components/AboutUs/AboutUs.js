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
            <h3>Welcome to Sahil-Al-Zuhoor -Best and  Trusted Furniture Supplier</h3><br />
            <p align="justify">
              At Sahil-Al-Zuhoor, we specialize in providing high-quality, durable furniture solutions for a variety of environments. Whether you need reliable and comfortable furniture for labor camps, modern and functional office furniture, sturdy school furniture, or robust metal bunk beds and lockers, we’ve got you covered. With years of experience in the industry, we are committed to delivering exceptional products that meet the needs of our diverse clientele.
            </p><br></br>
            <p align="justify">
              Explore our wide range of products and discover why Sahil-Al-Zuhoor is the preferred choice for businesses and institutions worldwide.
            </p>
          </div>
          <div>
            <h4>Key Products</h4><br />
            <p>Labor Camp Furniture</p>
            <p>Office Furniture</p>
            <p>School Furniture</p>
            <p>Steel Bunk Bed</p>
            <p>Steel Bed</p>
            <p>Steel Shoe rack</p>
            <p>Steel Locker</p>
            <p>Steel Cupboard</p>
            <p>Steel Locker Cabinet</p>
            <p>Chairs</p>
            <p>Tables</p>
            <p>File Cabinets</p>
            <p>Medical Mattress</p>

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
        <br /><br /><br />
        <div class="imgWrapper">
          <img className="aboutImage" src={"/images/about-image.jpg"} />
        </div><br /><br />
      </div>
    </>
  )
}

export default aboutUs







