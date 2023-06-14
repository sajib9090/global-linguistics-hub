import React, { useEffect, useState } from "react";
import PopularTeacherCard from "./PopularTeacherCard";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PopularInstructors = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: allStudents = [], refetch } = useQuery({
    queryKey: ["/students"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/students`, {});
      // console.log("res from axios", res.data);
      return res.data;
    },
  });

  const instructors = allStudents.filter(
    (student) => student.role === "instructor"
  );
  // console.log(instructors);
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
        {instructors?.slice(0, 6).map((teacher) => (
          <PopularTeacherCard key={teacher._id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
