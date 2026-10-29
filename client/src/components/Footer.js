import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer mt-5">
      <div className="container">

        <div className="row">

          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-heading">About Us</h5>
            <p>
              Ahmedabad Charity is dedicated to empowering local communities
              through sustainable initiatives in education, health, and wellness in Gujarat.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">Our Story</Link></li>
              <li><Link to="/programs" className="footer-link">Causes</Link></li>
              <li><Link to="/volunteer" className="footer-link">Become a Volunteer</Link></li>
              <li><Link to="/programs" className="footer-link">Donate Now</Link></li>
               <li><Link to="/contact" className="footer-link">contact us</Link></li>

            </ul>
          </div>

          <div className="col-lg-4 mb-4">
            <h5 className="footer-heading">Contact Information</h5>
            <ul className="list-unstyled">
              <li>Address: Navrangpura, Ahmedabad</li>
              <li>Phone: +91 8980844032</li>
              <li>Email: support@ahmedabadcharity.org</li>
            </ul>
          </div>

        </div>

        <hr />

        <div className="row align-items-center">

          <div className="col-md-6 text-center text-md-start">
            <p className="copyright-text">
              © {new Date().getFullYear()} Ahmedabad Charity. All Rights Reserved.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">

            <a href="https://facebook.com" className="me-3">
              <i className="bi bi-facebook"></i>
            </a>

            <a href="https://twitter.com" className="me-3">
              <i className="bi bi-twitter"></i>
            </a>

            <a href="https://instagram.com" className="me-3">
              <i className="bi bi-instagram"></i>
            </a>

            <a href="https://linkedin.com">
              <i className="bi bi-linkedin"></i>
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};


export default Footer;