import React, { useEffect, useState } from "react";
import axios from "axios";
import CauseCard from "../components/CauseCard";

const ProgramsPage = () => {

  const [causes, setCauses] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:4201/api/causes")
      .then((res) => {

        console.log(res.data);
        setCauses(res.data);
      })
      .catch((err) => {
        console.log("Error loading causes:", err);
      });

  }, []);

  return (

    <div className="container py-5">

      <div className="row g-4">

        {causes.map((cause) => (

          <div className="col-md-4" key={cause.id}>
<CauseCard
  id={cause.id}
  image={cause.image}
  title={cause.title}
  description={cause.description}
  raised={cause.collected_amount}
  goal={cause.goal_amount}
/>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ProgramsPage;