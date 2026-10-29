import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [causes, setCauses] = useState([]); // ✅ added

  const role = localStorage.getItem("userRole");

  useEffect(() => {

    if (role !== "admin" && role !== "volunteer") {
      alert("Access denied");
      window.location.href = "/";
      return;
    }

    fetchUsers();
    fetchDonations();
    fetchRequests();
    fetchCauses(); // ✅ added

  }, []);

  // ================= USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4201/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Users fetch error:", error);
    }
  };

  // ================= DONATIONS =================
  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:4201/api/admin/donations");
      setDonations(res.data);
    } catch (error) {
      console.log("Donation fetch error:", error);
    }
  };

  // ================= VOLUNTEER REQUESTS =================
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4201/api/admin/volunteer-requests");
      setRequests(res.data);
    } catch (error) {
      console.log("Request fetch error:", error);
    }
  };

  // ================= CAUSES =================
  const fetchCauses = async () => {
    try {
      const res = await axios.get("http://localhost:4201/api/causes");
      setCauses(res.data);
    } catch (error) {
      console.log("Causes fetch error:", error);
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:4201/api/admin/users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.log("Delete user error:", error);
    }
  };

  // ================= DELETE CAUSE =================
  const deleteCause = async (id) => {

    if (!window.confirm("Delete this cause?")) return;

    const userId = localStorage.getItem("userId");

    try {
      await axios.delete(
        `http://localhost:4201/api/admin/delete-cause/${id}`,
        {
          data: { user_id: userId }
        }
      );

      alert("Cause deleted");
      fetchCauses();

    } catch (err) {
      alert("Not allowed");
    }
  };

  // ================= APPROVE VOLUNTEER =================
  const approve = async (id) => {
    try {
      await axios.put(`http://localhost:4201/api/admin/approve-volunteer/${id}`);
      alert("Volunteer Approved!");
      fetchRequests();
      fetchUsers();
    } catch (error) {
      console.log("Approve error:", error);
    }
  };

 return (
  <div className="container mt-5">

    <h1 className="fw-bold mb-4">Admin Dashboard</h1>

    {/* ================= USERS ================= */}
    <div className="card shadow mb-5">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Users</h5>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>
                  <a href={`/admin/user/${user.id}`} className="fw-bold text-primary">
                    {user.name}
                  </a>
                </td>

                <td>{user.email}</td>

                <td>
                  <span className={`badge 
                    ${user.role === "admin" ? "bg-danger" :
                      user.role === "volunteer" ? "bg-warning text-dark" :
                      "bg-secondary"}`}>
                    {user.role}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


    {/* ================= DONATIONS ================= */}
    <div className="card shadow mb-5">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">Donations</h5>
      </div>

      <div className="card-body p-0">
        <table className="table table-striped mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td className="fw-bold text-success">₹{d.amount}</td>
                <td>{new Date(d.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


    {/* ================= VOLUNTEER REQUESTS ================= */}
    {role === "admin" && (
      <div className="card shadow mb-5">
        <div className="card-header bg-warning">
          <h5 className="mb-0">Volunteer Requests</h5>
        </div>

        <div className="card-body">

          {requests.length === 0 ? (
            <p className="text-muted">No pending requests</p>
          ) : (
            requests.map((user) => (
              <div key={user.id} className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <strong>{user.name}</strong><br />
                  <small>{user.email}</small>
                </div>

                <button
                  onClick={() => approve(user.id)}
                  className="btn btn-success btn-sm"
                >
                  Approve
                </button>

              </div>
            ))
          )}

        </div>
      </div>
    )}


    {/* ================= CAUSES ================= */}
    <div className="card shadow mb-5">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Causes</h5>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Goal</th>
              <th>Collected</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {causes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>₹{c.goal_amount}</td>
                <td className="fw-bold text-success">₹{c.collected_amount}</td>

                <td>
                  {(role === "admin" || role === "volunteer") && (
                    <button
                      onClick={() => deleteCause(c.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);
}

export default AdminDashboard;