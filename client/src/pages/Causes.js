import React,{useEffect,useState} from "react";
import axios from "axios";

function Causes(){

const [causes,setCauses] = useState([]);

useEffect(()=>{

 axios.get("http://localhost:4201/causes")
 .then(res=>{
   setCauses(res.data);
 });

},[]);

const donate = (causeId)=>{

 const amount = prompt("Enter donation amount");

 const user_id = localStorage.getItem("user_id");
 const user_name = localStorage.getItem("name");

 axios.post("http://localhost:4201/donate",{
   user_id,
   user_name,
   cause_id:causeId,
   amount
 }).then(res=>{
   alert("Donation successful");
 });

};

return(

<div>

<h2>Donation Causes</h2>

{causes.map((c)=>{

 return(

  <div key={c.id} style={{border:"1px solid gray",padding:"20px",margin:"20px"}}>

  <h3>{c.title}</h3>

  <p>{c.description}</p>

  <p>Target : ₹{c.target_amount}</p>

  <p>Collected : ₹{c.collected_amount}</p>

  <button onClick={()=>donate(c.id)}>Donate</button>

  </div>

 )

})}

</div>

)

}

export default Causes;