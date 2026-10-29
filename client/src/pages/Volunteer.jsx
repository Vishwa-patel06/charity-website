import React, { useState } from "react";
import axios from "axios";
import "./Volunteer.css";

const volunteers = [
  {
    name: "Riya Patel",
    role: "Education Volunteer",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Amit Shah",
    role: "Healthcare Support",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Neha Mehta",
    role: "Food Distribution",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Rahul Verma",
    role: "Community Helper",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  }
];

const Volunteer = () => {

  const role = localStorage.getItem("userRole"); // ✅ moved inside
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login first");
      return;
    }

    // ✅ block admin
    if (role === "admin") {
      alert("Admin cannot apply as volunteer");
      return;
    }

    try {

      await axios.post("http://localhost:4201/api/become-volunteer", {
        user_id: userId
      });

      alert("Request sent! Wait for admin approval.");

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error sending request");
    }
  };

  return (
    <div className="volunteer-page">

      {/* HERO */}
      <div className="vol-hero">
        <div className="overlay">
          <h1>Volunteers</h1>
        </div>
      </div>

      {/* INTRO */}
      <div className="container vol-intro">
        <h2>Why Become a Volunteer?</h2>
        <p>
          Volunteering with Humanity Charity gives you the opportunity to make a real difference in people's lives.
        </p>
      </div>

      {/* VOLUNTEERS LIST */}
      <div className="container vol-section">
        <h2>Meet Our Volunteers</h2>

        <div className="vol-grid">
          {volunteers.map((v, index) => (
            <div className="vol-card" key={index}>
              <img src={v.image} alt={v.name} />
              <h3>{v.name}</h3>
              <p>{v.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div className="container vol-form-section">
        <h2>Become a Volunteer</h2>

        <form onSubmit={handleSubmit} className="vol-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Why do you want to volunteer?"
            value={form.message}
            onChange={handleChange}
          ></textarea>

          {/* ✅ CONDITIONAL BUTTON */}
          {role !== "admin" ? (
            <button type="submit">Join Now</button>
          ) : (
            <p style={{ color: "red", marginTop: "10px" }}>
              Admin cannot apply as volunteer
            </p>
          )}

        </form>
      </div>

    </div>
  );
};

export default Volunteer;