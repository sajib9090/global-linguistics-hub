import React from "react";

const PopularTeacherCard = ({ teacher }) => {
  const { instructor_name, image, course_name, number_of_students } = teacher;
  return (
    <div className="card bg-[#F5F7FA] border-[#E2E8F0] rounded-lg overflow-hidden shadow-lg">
      <img
        src={image}
        alt={instructor_name}
        className="card-img-top h-[400px] object-cover"
      />
      <div className="card-body">
        <h5 className="card-title text-xl font-bold mb-2">{instructor_name}</h5>
        <p className="card-text text-lg">
          <strong>Course:</strong> {course_name}
        </p>
        <p className="card-text text-lg">
          <strong>Number of Students:</strong> {number_of_students}
        </p>
      </div>
    </div>
  );
};

export default PopularTeacherCard;
