
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePages.css";
import WorkInAction from "../components/WorkInAction";
import RecentDonations from "../components/RecentDonations";
import { FaHandsHelping, FaSearch, FaDonate } from "react-icons/fa";
import { useEffect } from "react";

const HomePage = () => {

  const navigate = useNavigate();   // ✅ IMPORTANT

  useEffect(() => {
  const elements = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-up"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}, []);

  return (
    <div className="home-page">

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Small Help Can Make a Big Change</h1>

          <p>
            We are dedicated to improving the lives of underprivileged communities
            in Gujarat and across India. Your support can provide education,
            healthcare, and hope.
          </p>

          <Link to="/donate" className="btn btn-primary donate-btn px-4 me-2">
            Donate Now
          </Link>
        </div>
      </header>


     


      <section className="mission-section container">

  <h2>Our Mission</h2>

  <div className="mission-content">

    <img
      className="fade-right"
      src="https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg"
      alt="Children studying"
    />

    <div className="fade-left">
      <p>
        Our mission is to empower communities through sustainable
        initiatives in education, health, and wellness.
      </p>

      <p>
        From providing school supplies in Ahmedabad to funding medical
        camps in rural Gujarat, every program is designed for impact.
      </p>
    </div>

  </div>

</section>
   {/* Recent Donations */}
<div className="recent-section">
  <RecentDonations />
</div>

      {/* ⭐ FEATURE SECTION */}
      <section className="feature-section">

        <div className="feature-overlay">
<div 
  className="feature-box"
  onClick={() => navigate("/volunteer")}
>
  <div className="icon"><FaHandsHelping /></div>
  <h3>Become a Volunteer</h3>
  <p>
    Join us and make a difference by helping communities.
  </p>
</div>

          <div 
            className="feature-box"
            onClick={() => navigate("/events")}
          >
            <div className="icon"><FaSearch /></div>
            <h3>Explore Causes</h3>
            <p>
              Browse active causes and support meaningful initiatives.
            </p>
          </div>

          <div 
            className="feature-box"
            onClick={() => navigate("/donate")}
          >
            <div className="icon"><FaDonate /></div>
            <h3>Make a Donation</h3>
            <p>
              Support our causes and help people in need.
            </p>
          </div>

        </div>

      </section>


      {/* Work Section */}
      <WorkInAction />

       {/* Impact Section */}
      <section className="impact-section">
        <h2>Our Impact So Far</h2>

        <div className="impact-cards">

          <div className="impact-card">
            <h3>5,000+</h3>
            <p>Children Educated</p>
          </div>

          <div className="impact-card">
            <h3>10,000+</h3>
            <p>Meals Provided</p>
          </div>

          <div className="impact-card">
            <h3>50+</h3>
            <p>Villages Supported</p>
          </div>

        </div>
      </section>


     


    </div>
  );
};

export default HomePage;
