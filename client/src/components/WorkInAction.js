import React from 'react';
import './WorkInAction.css'; 

const WorkInAction = () => {
 const images = [
  {
    src: "https://cf.ltkcdn.net/charity/images/std-xs/266948-340x219-helping-homeless.jpg",
    alt: "Providing meals to the hungry"
  },
  {
    src: "https://images.unsplash.com/photo-1576765608866-5b51046452be",
    alt: "Volunteers helping the elderly"
  },
  {
    src: "https://spweb-uploads.s3.theark.cloud/2018/08/India-flooding-home-screen-764x460.jpg",
    alt: "Distributing essential supplies"
  },
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    alt: "Community education program"
  },
  {
    src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
    alt: "Children learning in a safe environment"
  },
  {
    src: "https://images.unsplash.com/photo-1593113630400-ea4288922497",
    alt: "Supporting local farmers"
  }
];

  return (
    <div className="work-in-action-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Our Work in Action</h2>
          <p className="lead text-muted">See how your support directly impacts lives in Ahmedabad and beyond.</p>
        </div>
        <div className="row g-4">
          {images.map((img, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="action-card shadow-sm rounded">
                <img src={img.src} alt={img.alt} className="img-fluid rounded" />
                <p className="image-caption mt-2 mb-0 text-muted">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkInAction;