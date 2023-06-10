import React, { useEffect, useState } from "react";
import PopularTeacherCard from "./PopularTeacherCard";

const PopularInstructors = () => {
  const [popularTeachers, setPopularTeachers] = useState([]);
  useEffect(() => {
    fetch(`topTeachers.json`)
      .then((res) => res.json())
      .then((data) => {
        setPopularTeachers(data);
      });
  }, []);
  // console.log(popularTeachers);
  return (
    <div className="mt-[150px]">
      <div className="text-center">
        <h1 className="text-[40px] font-bold mb-4 tracking-[10px]">
          Popular Instructors
        </h1>
        <p className="text-base font-extralight ">
          Based on students enrollment
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 mt-[100px]">
        {popularTeachers?.map((teacher, index) => (
          <PopularTeacherCard key={index} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
