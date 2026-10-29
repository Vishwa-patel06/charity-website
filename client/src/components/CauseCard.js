import React from "react";
import { Link } from "react-router-dom";

const CauseCard = ({ id, image, title, description, raised, goal }) => {

  const safeRaised = raised || 0;
  const safeGoal = goal || 10000;

  const progress = safeGoal
    ? Math.round((safeRaised / safeGoal) * 100)
    : 0;

  return (

    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "15px" }}>

      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{
          height: "220px",
          objectFit: "cover",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px"
        }}
      />

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">{title}</h5>

        <p className="card-text text-muted">{description}</p>

        <div className="mt-auto">

          <div className="progress my-2" style={{ height: "8px" }}>
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#71b1a1"
              }}
            />
          </div>

          <div className="d-flex justify-content-between">
            <span className="fw-bold">
              Raised: ₹{safeRaised.toLocaleString("en-IN")}
            </span>

            <span className="text-muted">
              Goal: ₹{safeGoal.toLocaleString("en-IN")}
            </span>
          </div>

          <Link to={`/donate/${id}`} className="btn btn-primary w-100 mt-3">
            Donate Now
          </Link>

        </div>

      </div>

    </div>

  );

};

export default CauseCard;