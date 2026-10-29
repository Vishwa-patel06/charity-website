import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

const token = localStorage.getItem("token");
const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header>

      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            <span style={{ fontWeight: "800", color: "#5a6f7c" }}>

              Huminity Charity
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">

              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/about">About</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/programs">Causes</NavLink>
              </li>
              <li className="nav-item">
 <NavLink className="nav-link mx-2" to="/volunteer">
  Volunteer
</NavLink>
</li>

              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/contact">Contact</NavLink>
              </li>

         <li className="nav-item ms-lg-3">
 <NavLink 
  className="btn btn-primary donate-btn px-4 me-2" 
  to="/donate"
>
  Donate Now
</NavLink>
</li>
              

              {!token && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link mx-2" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link mx-2" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {token && (
  <>
    <li className="nav-item">
      <NavLink className="nav-link mx-2" to="/profile">
        Profile
      </NavLink>
    </li>

    {role === "admin" && (
      <li className="nav-item">
        <NavLink className="nav-link mx-2" to="/admin">
          Admin Dashboard
        </NavLink>
      </li>
    )}

    {role === "volunteer" && (
      <li className="nav-item">
       <NavLink className="nav-link mx-2" to="/volunteer-dashboard">
  Volunteer Panel
</NavLink>
      </li>
    )}

    <li className="nav-item">
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </li>
  </>
)}

            

            </ul>
          </div>

        </div>
      </nav>

    </header>
  );
};

export default Navbar;