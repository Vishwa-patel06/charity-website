import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {

    axios.get("http://localhost:4201/api/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  };

  const deleteUser = (id) => {

    if (!window.confirm("Delete this user?")) return;

    axios.delete(`http://localhost:4201/api/users/${id}`)
    .then(() => {
      alert("User deleted");
      fetchUsers();
    })
    .catch((err) => {
      console.log(err);
    });

  };

  return (

    <div style={{padding:"20px"}}>

      <h2>Manage Users</h2>

      <table border="1" cellPadding="10" style={{width:"100%"}}>

        <thead>
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
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <button
                  style={{background:"red",color:"white"}}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminUsers;