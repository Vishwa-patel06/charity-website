import React from "react";
import "./About.css";

const AboutPage = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay">
          <div className="container text-center text-white">
            <h1>About Humanity Charity</h1>
            <p>
              Transforming lives through compassion, collaboration, and community-driven impact.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="container about-content">
        <h2>Our Story</h2>

        <p>
          Humanity Charity was founded in Ahmedabad in 2024 with a clear purpose — to create real and lasting change in the lives of people facing hardship. What started as a small initiative by a group of passionate individuals has grown into a dedicated platform connecting donors, volunteers, and communities in need.
        </p>

        <p>
          We identified critical issues such as lack of access to education, food insecurity, and limited healthcare support. Through strategic programs and grassroots efforts, we aim to bridge these gaps and provide sustainable solutions that empower individuals and families.
        </p>

        <p>
          Our work is built on trust, transparency, and measurable impact. Every contribution we receive is carefully utilized to maximize its effect, ensuring that help reaches the right people at the right time.
        </p>
      </section>

   
      {/* MISSION VISION */}
      <section className="container mission-vision">
        <div className="row">

          <div className="col-md-6">
            <div className="card-box">
              <h3>🎯 Our Mission</h3>
              <p>
                To uplift underprivileged communities by providing access to essential resources such as education, healthcare, food, and clean water. We strive to create opportunities that enable individuals to lead independent and dignified lives.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card-box">
              <h3>🌍 Our Vision</h3>
              <p>
                To build a future where every individual, regardless of background, has equal opportunities to grow, succeed, and contribute to society. We envision empowered communities that are self-sufficient and resilient.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* IMPACT */}
      <section className="impact-section text-center">
        <div className="container">
          <h2>Our Impact</h2>

          <div className="row mt-4">

            <div className="col-md-4">
              <div className="impact-card">
                <h1>500+</h1>
                <p>Families Supported</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="impact-card">
                <h1>120+</h1>
                <p>Volunteers Engaged</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="impact-card">
                <h1>50+</h1>
                <p>Projects Completed</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;