import React from "react";

const InstructorCard = ({ instructor }) => {
  const { photo, name, email } = instructor;
  console.log(instructor);
  return (
    <div className="card bg-[#0086FF] bg-opacity-20 shadow-lg rounded-lg overflow-hidden">
      <img src={photo} alt={name} className="card-img h-[300px] object-cover" />
      <div className="card-body  p-4">
        <h3 className="card-title text-2xl font-bold mb-2">{email}</h3>
        <div className="card-text">
          <p className="text-lg mb-2">
            <strong>Name:</strong> {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
