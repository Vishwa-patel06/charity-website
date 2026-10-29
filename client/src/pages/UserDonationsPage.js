import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserDonationsPage() {

  const { id } = useParams();
  const [donations, setDonations] = useState([]);

  useEffect(() => {

 axios.get(`http://localhost:4201/api/user-donations/${id}`)
      .then(res => setDonations(res.data))
      .catch(err => console.log(err));

  }, [id]);

  return (

   <div className="container mt-5">

  <h2 className="fw-bold mb-4">User Donation History</h2>

  <div className="card shadow">

    <div className="card-header bg-primary text-white">
      <h5 className="mb-0">Donation Records</h5>
    </div>

    <div className="card-body p-0">

      <table className="table table-striped table-hover mb-0">

        <thead className="table-light">
          <tr>
            <th>Cause</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {donations.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-3">
                No donations found
              </td>
            </tr>
          ) : (
            donations.map((d) => (
              <tr key={d.id}>
                <td>{d.title}</td>

                <td className="fw-bold text-success">
                  ₹{d.amount}
                </td>

                <td>
                  {new Date(d.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>

  </div>

</div>

  );

}

export default UserDonationsPage;