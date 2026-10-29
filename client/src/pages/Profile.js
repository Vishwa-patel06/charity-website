import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile(){

  const [donations,setDonations] = useState([]);

  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  useEffect(()=>{

    axios.get(`http://localhost:4201/api/user-donations/${userId}`)
    .then(res=>{
      setDonations(res.data);
    });

  },[userId]);

  // 👉 total donation (nice extra feature)
  const totalAmount = donations.reduce((sum,d)=>sum + Number(d.amount),0);

  return(

    <div className="container mt-5">

      <h2 className="fw-bold mb-4">My Profile</h2>

      {/* ================= PROFILE CARD ================= */}
      <div className="card shadow mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">

          <div>
            <h4 className="mb-1">{userName}</h4>
            <p className="mb-1 text-muted">{email}</p>

            <span className={`badge 
              ${role === "admin" ? "bg-danger" :
                role === "volunteer" ? "bg-warning text-dark" :
                "bg-secondary"}`}>
              {role}
            </span>
          </div>

          <div className="text-end">
            <h5 className="text-success mb-0">₹{totalAmount}</h5>
            <small className="text-muted">Total Donated</small>
          </div>

        </div>
      </div>


      {/* ================= DONATION HISTORY ================= */}
      <div className="card shadow">

        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Donation History</h5>
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
                    No donations yet
                  </td>
                </tr>
              ) : (
                donations.map((d,i)=>(
                  <tr key={i}>
                    <td>{d.title || "General"}</td>

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

export default Profile;