
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import DonationsListPage from './pages/DonationsListPage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import Causes from "./pages/Causes";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Volunteer from "./pages/Volunteer";
import "./styles/theme.css";
import "./styles/main.css";
import UserDonationsPage from "./pages/UserDonationsPage";



function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        <Navbar /> 

        <main className="flex-grow-1 pb-5">
          <Routes>

            <Route path="/" element={<HomePage />} />

            {/* ✅ FIXED DONATE */}
           <Route path="/donate" element={<DonatePage />} />        // general donation
<Route path="/donate/:id" element={<DonatePage />} />    // cause donation

            {/* ✅ FIXED EVENTS */}
            <Route path="/events" element={<ProgramsPage />} />

            <Route path="/donations" element={<DonationsListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/admin/user/:id" element={<UserDonationsPage />} />

            {/* ADMIN */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-users" element={<AdminUsers />} />

            {/* USER */}
            <Route path="/profile" element={<Profile />} />

            {/* CAUSES */}
            <Route path="/causes" element={<Causes />} />


            {/* ✅ VOLUNTEER */}
        
<Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />

          </Routes>
        </main>
        
        <Footer /> 

      </div>
    </Router>
  );
}

export default App;
