import React from "react";

const PopularClassesCard = ({ pc }) => {
  return (
    <div className="card bg-[#0086FF] bg-opacity-20 shadow-lg rounded-lg overflow-hidden">
      <img
        src={pc.classImage}
        alt={pc.name}
        className="card-img h-[300px] object-cover"
      />
      <div className="card-body  p-4">
        <h3 className="card-title text-2xl font-bold mb-2">{pc.className}</h3>
        <div className="card-text">
          <p className="text-lg mb-2">
            <strong>Teacher:</strong> {pc.instructorName}
          </p>
          <p className="text-lg mb-2">
            <strong>Price:</strong> ${pc.price}
          </p>
          <p className="text-lg mb-2">
            <strong>Number of Students:</strong> {pc.availableSeats}
          </p>
          <p className="text-lg mb-2">
            <strong>Enrollment:</strong> Closes soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularClassesCard;
