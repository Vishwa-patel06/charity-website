import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

     await axios.post("http://localhost:4201/api/register",{
  name,
  email,
  password
});
      alert("Registration Successful!");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.error(error);
      alert("Registration Failed");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" type="submit">
            Register
          </button>

        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>

    </div>

  );

}

export default RegisterPage;