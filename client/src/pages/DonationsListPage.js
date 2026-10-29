import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationsListPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/donations');
        setDonations(data);
      } catch (err) {
        setError("Failed to fetch donations. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  if (loading) return <div className="container"><p>Loading recent donations...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;

  return (
    <div className="container">
      <h2>Recent Donations</h2>
      {donations.length > 0 ? (
        <ul className="donations-list">
          {donations.map((donation) => (
            <li key={donation._id}>
              <strong>{donation.name}</strong> generously donated <strong>₹{donation.amount}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations have been made yet. Be the first!</p>
      )}
    </div>
  );
};

export default DonationsListPage;