import React from "react";

const PopularTeacherCard = ({ teacher }) => {
  console.log(teacher);
  const { email, name, photo } = teacher;
  return (
    <div className="card bg-[#F5F7FA] border-[#E2E8F0] rounded-lg overflow-hidden shadow-lg">
      <img
        src={photo}
        alt={name}
        className="card-img-top h-[400px] object-cover"
      />
      <div className="card-body">
        <h5 className="card-title text-xl font-bold mb-2">{name}</h5>

        <p className="card-text text-lg">
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};

export default PopularTeacherCard;
