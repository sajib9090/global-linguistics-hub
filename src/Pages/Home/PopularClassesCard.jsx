import React from "react";

const PopularClassesCard = ({ pc }) => {
  return (
    <div className="card bg-[#0086FF] bg-opacity-20 shadow-lg rounded-lg overflow-hidden">
      <img
        src={pc.picture}
        alt={pc.course_name}
        className="card-img h-[300px] object-cover"
      />
      <div className="card-body  p-4">
        <h3 className="card-title text-2xl font-bold mb-2">{pc.course_name}</h3>
        <div className="card-text">
          <p className="text-lg mb-2">
            <strong>Teacher:</strong> {pc.teacher_name}
          </p>
          <p className="text-lg mb-2">
            <strong>Date:</strong> {pc.date}
          </p>
          <div className="text-lg mb-2">
            <strong>Activities:</strong>
            <ul className="list-disc pl-6">
              {pc.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <p className="text-lg mb-2">
            <strong>Number of Students:</strong> {pc.number_of_students}
          </p>
          <p className="text-lg mb-2">
            <strong>Enrollment:</strong> {pc.enrollment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularClassesCard;
