import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Toaster, toast } from "react-hot-toast";

const ManageUsers = () => {
  const { data: students = [], refetch } = useQuery(["students"], async () => {
    const res = await fetch("http://localhost:5000/students");
    return res.json();
  });
  console.log(students);

  const handleMakeAdmin = (student) => {
    fetch(`http://localhost:5000/students/admin/${student._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // alert(`${student.name}, is admin now`);
          refetch();
          toast.success(`${student.name}, is admin now`);
        }
      });
  };
  const handleMakeInstructor = (student) => {
    fetch(`http://localhost:5000/students/instructor/${student._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          // alert(`${student.name}, is instructor now`);
          toast.success(`${student.name}, is instructor now`);
        }
      });
  };
  return (
    <div className="">
      <h1 className="font-bold text-2xl px-6 py-4">
        Total Users: {students?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#007cff] bg-opacity-20">
            <tr>
              <th>
                <label>
                  <p>#</p>
                </label>
              </th>
              <th className="text-center">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Change Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-[#007cff] bg-opacity-10">
            {/* row 1 */}
            {students?.map((student, index) => (
              <tr className="border-b-2 border-gray-500" key={student._id}>
                <th>
                  <label>
                    <p>{index + 1}</p>
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={student.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td>{student.email}</td>
                <td>
                  {student.role !== "admin" && student.role !== "instructor"
                    ? "Student"
                    : student.role}
                </td>
                <td className="flex flex-col space-y-2">
                  {student.role === "admin" ? (
                    <>
                      <button
                        disabled
                        onClick={() => handleMakeAdmin(student)}
                        className="btn btn-success"
                      >
                        Admin
                      </button>
                      {/* <button
                        onClick={() => handleMakeInstructor(student)}
                        className="btn"
                      >
                        Instructor
                      </button> */}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(student)}
                        className="btn btn-success"
                      >
                        Admin
                      </button>
                      {/* <button
                        onClick={() => handleMakeInstructor(student)}
                        className="btn"
                      >
                        Instructor
                      </button> */}
                    </>
                  )}
                  {student.role === "instructor" ? (
                    <>
                      {/* <button
                        disabled
                        onClick={() => handleMakeAdmin(student)}
                        className="btn"
                      >
                        Admin
                      </button> */}
                      <button
                        disabled
                        onClick={() => handleMakeInstructor(student)}
                        className="btn btn-info"
                      >
                        Instructor
                      </button>
                    </>
                  ) : (
                    <>
                      {/* <button
                        onClick={() => handleMakeAdmin(student)}
                        className="btn"
                      >
                        Admin
                      </button> */}
                      <button
                        onClick={() => handleMakeInstructor(student)}
                        className="btn btn-info"
                      >
                        Instructor
                      </button>
                    </>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default ManageUsers;
