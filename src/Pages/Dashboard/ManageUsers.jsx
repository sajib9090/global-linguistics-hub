import React from "react";
import { useLoaderData } from "react-router-dom";

const ManageUsers = () => {
  const students = useLoaderData();
  console.log(students);
  return (
    <div>
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
              <tr key={student._id}>
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
                <td>Admin</td>
                <td className="flex flex-col space-y-2">
                  <button className="btn">Admin</button>
                  <button className="btn">Instructor</button>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
