import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DonationForm from "../components/DonationForm";

const DonatePage = () => {

  const navigate = useNavigate();
  const { id } = useParams(); // cause id from URL

  useEffect(() => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please login first to donate");
      navigate("/login");
    }

  }, [navigate]);

  return (
    <div className="container mt-5">

      <h2 className="mb-3">Make a Donation</h2>

      <p className="mb-4">
        Your contribution can make a world of difference. Thank you for your support!
      </p>

      <DonationForm causeId={id} />

    </div>
  );
};

export default DonatePage;