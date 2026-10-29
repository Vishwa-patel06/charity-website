import React, { useState, useEffect } from "react";
import axios from "axios";

function VolunteerDashboard(){

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [goal,setGoal] = useState("");
  const [image,setImage] = useState("");
  const [causes,setCauses] = useState([]);

  // ================= FETCH CAUSES =================
  const fetchCauses = async () => {
    try{
      const res = await axios.get("http://localhost:4201/api/causes");
      setCauses(res.data);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchCauses();
  },[]);

  // ================= ADD CAUSE =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      await axios.post("http://localhost:4201/api/add-cause",{
        title,
        description,
        goal_amount:goal,
        image
      });

      alert("Cause added successfully");

      setTitle("");
      setDescription("");
      setGoal("");
      setImage("");

      fetchCauses(); // refresh list

    }catch(err){
      console.log(err);
    }

  };

  // ================= DELETE CAUSE =================
  const deleteCause = async (id) => {

    if(!window.confirm("Delete this cause?")) return;

    const userId = localStorage.getItem("userId");

    try{

      await axios.delete(
        `http://localhost:4201/api/admin/delete-cause/${id}`,
        {
          data:{ user_id:userId }
        }
      );

      alert("Cause deleted");

      fetchCauses(); // refresh

    }catch(err){
      alert("Not allowed");
    }

  };

  return(

    <div className="container mt-5">

      <h2>Add New Cause</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Cause Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Goal Amount"
          value={goal}
          onChange={(e)=>setGoal(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />

        <button className="btn btn-success">
          Add Cause
        </button>

      </form>

      {/* ================= CAUSES LIST ================= */}

      <h2 className="mt-5">All Causes</h2>

      <table border="1" cellPadding="10" style={{width:"100%"}}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Goal</th>
            <th>Collected</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {causes.length === 0 ? (
            <tr>
              <td colSpan="5">No causes available</td>
            </tr>
          ) : (
            causes.map((c)=>(
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>₹{c.goal_amount}</td>
                <td>₹{c.collected_amount}</td>

                <td>
                  <button
                    onClick={()=>deleteCause(c.id)}
                    style={{background:"red",color:"white"}}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>

  )

}

export default VolunteerDashboard;