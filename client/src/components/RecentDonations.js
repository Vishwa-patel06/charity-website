import React, { useEffect, useState } from "react";
import "./RecentDonations.css";

const RecentDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4201/api/recent-donations")
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  return (
    <div className="donation-ticker">
      <div className="ticker-track">
        {donations.map((d, index) => (
         <span className="ticker-item">
  {d.donor_name} donated <span className="amount">₹{d.amount}</span> ★
</span>
        ))}

        {/* Duplicate for smooth infinite loop */}
       {donations.map((d, index) => (
  <span key={"dup-" + index} className="ticker-item">
    {d.donor_name} donated <span className="amount">₹{d.amount}</span> ★
  </span>
))}
      </div>
    </div>
  );
};

export default RecentDonations;