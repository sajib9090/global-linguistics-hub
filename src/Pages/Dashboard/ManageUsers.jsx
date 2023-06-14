import { useQuery } from "@tanstack/react-query";

import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students`);
      console.log("res from axios", res.data);
      return res.data;
    },
  });
  // const { data: students = [], refetch } = useQuery(["students"], async () => {
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/students`);
  //   return res.json();
  // });
  // console.log(students);

  const handleMakeAdmin = (student) => {
    fetch(`${import.meta.env.VITE_API_URL}/students/admin/${student._id}`, {
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
    fetch(
      `${import.meta.env.VITE_API_URL}/students/instructor/${student._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          // alert(`${student.name}, is instructor now`);
          toast.success(`${student.name}, is instructor now`);
        }
      });
  };

  const handleUserDelete = (student) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${student.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/students/${student._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", `${student.name} is deleted`, "success");
            }
          });
      }
    });
  };

  return (
    <>
      {students && Array.isArray(students) && students.length > 0 ? (
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
                            className="btn btn-sm btn-success"
                          >
                            Admin
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleMakeAdmin(student)}
                            className="btn btn-sm btn-success"
                          >
                            Admin
                          </button>
                        </>
                      )}
                      {student.role === "instructor" ? (
                        <>
                          <button
                            disabled
                            onClick={() => handleMakeInstructor(student)}
                            className="btn btn-sm btn-info"
                          >
                            Instructor
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleMakeInstructor(student)}
                            className="btn btn-sm btn-info"
                          >
                            Instructor
                          </button>
                        </>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleUserDelete(student)}
                        className="btn btn-ghost btn-xs bg-[red] text-white"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Toaster />
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-center text-5xl">No user found</h1>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
