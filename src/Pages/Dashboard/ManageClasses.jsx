import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  // const { data: classes = [], refetch } = useQuery(["classes"], async () => {
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/classes`);
  //   return res.json();
  // });
  const { refetch, data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes`);
      console.log("res from axios", res.data);
      return res.data;
    },
  });

  const { data: pendingClasses = [], refetch: refetchPendingClasses } =
    useQuery(["pending"], async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/classes/pending`
      );
      return res.json();
    });
  console.log(pendingClasses);
  const handleApproved = (course) => {
    fetch(`${import.meta.env.VITE_API_URL}/classes/approved/${course._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // alert(`${student.name}, is admin now`);
          refetch();
          refetchPendingClasses();
          toast.success(`${course.className}, is approved now`);
        }
      });
  };
  //
  const handleDenied = (course) => {
    Swal.fire({
      title: "Are you sure?",
      html: `
        <input type="text" id="reasonInput" class="swal2-input" placeholder="Reason">
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deny it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const reason = document.getElementById("reasonInput").value;

        fetch(`${import.meta.env.VITE_API_URL}/classes/denied/${course._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              refetchPendingClasses();
              Swal.fire(
                "Denied!",
                `${course.className} is denied with reason: ${reason}`,
                "success"
              );
            }
          });
      }
    });
  };

  ///

  const handleDelete = (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${course.className}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/classes/${course._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              refetchPendingClasses();
              Swal.fire(
                "Deleted!",
                `${course.className} is deleted`,
                "success"
              );
            }
          });
      }
    });
  };
  // myClasses && Array.isArray(myClasses) && myClasses.length > 0 ?
  return (
    <>
      {classes && Array.isArray(classes) && classes.length > 0 ? (
        <div>
          <Helmet>
            <title>Global | Manage Classes</title>
          </Helmet>
          <div className="">
            <div className="flex items-center justify-between bg-[black] bg-opacity-80 text-white ">
              <h1 className="font-bold text-2xl px-6 py-4">
                Pending Classes: {pendingClasses.length}
              </h1>
              <h1 className="font-bold text-2xl px-6 py-4">
                All Post: {classes.length}
              </h1>
            </div>
            <div className="overflow-x-auto"></div>
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
                  <th>Status</th>
                  <th className="text-center">Change Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-[#007cff] bg-opacity-10">
                {/* row 1 */}
                {classes?.map((course, index) => (
                  <tr className="border-b-2 border-gray-500" key={course._id}>
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
                              src={course.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {course?.className?.length > 20
                              ? course.className.slice(0, 20)
                              : course.className}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{course.instructorEmail}</td>
                    <td>{course.status}</td>
                    <td className="flex flex-col items-center justify-center space-y-1">
                      {course.status === "pending" ||
                      course.status === "denied" ? (
                        <button
                          onClick={() => handleApproved(course)}
                          className="btn btn-sm btn-success text-white"
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          disabled
                          onClick={() => handleApproved(course)}
                          className="btn btn-sm btn-success text-white"
                        >
                          Approved
                        </button>
                      )}
                      {course.status === "pending" ||
                      course.status === "approved" ? (
                        <button
                          onClick={() => handleDenied(course)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Denied
                        </button>
                      ) : (
                        <button
                          disabled
                          onClick={() => handleDenied(course)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Denied
                        </button>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleDelete(course)}
                        className="btn btn-ghost btn-xs bg-[red] text-white"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <Toaster />
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-center text-5xl">No classes found</h1>
        </div>
      )}
    </>
  );
};

export default ManageClasses;
