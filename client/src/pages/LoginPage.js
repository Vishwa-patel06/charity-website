import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("http://localhost:4201/api/login", {
        email,
        password
      });

      console.log("SERVER RESPONSE:", res.data);

if(res.data.message === "Login successful"){
localStorage.setItem("userId", res.data.id);
localStorage.setItem("userName", res.data.name);
localStorage.setItem("email", res.data.email);
localStorage.setItem("userRole", res.data.role);
localStorage.setItem("token", res.data.token);
  alert("Login successful");

  if(res.data.role === "admin"){
    navigate("/admin");
  } else {
    navigate("/");
  }

}else {

        alert(res.data.message || "Invalid email or password");

      }

    } catch(error) {

      console.error(error);
      alert("Login failed. Please try again.");

    }

  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"80vh"
    }}>

      <div style={{
        width:"350px",
        padding:"30px",
        background:"#fff",
        borderRadius:"10px",
        boxShadow:"0 0 10px rgba(0,0,0,0.2)"
      }}>

        <h2 style={{textAlign:"center"}}>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"10px",
              background:"#2563eb",
              color:"#fff",
              border:"none",
              cursor:"pointer"
            }}
          >
            Login
          </button>

        </form>

        <p style={{textAlign:"center",marginTop:"10px"}}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>

  );
}

export default LoginPage;