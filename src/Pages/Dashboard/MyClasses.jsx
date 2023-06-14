import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";
import { Toaster } from "react-hot-toast";
import { RiFileEditLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useAuth();
  const [expanded, setExpanded] = useState(false);

  // const { data: myClasses = [], refetch } = useQuery(
  //   [`classes/${user?.email}`],
  //   async () => {
  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_URL}/classes/${user.email}`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //         },
  //       }
  //     );
  //     return res.json();
  //   }
  // );
  const { refetch, data: myClasses = [] } = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      console.log("res from axios", res.data);
      return res.data;
    },
  });

  // console.log(myClasses);
  return (
    <>
      {myClasses && Array.isArray(myClasses) && myClasses.length > 0 ? (
        <div>
          <Helmet>
            <title>Global | My Classes</title>
          </Helmet>
          <div className="">
            <div className="flex items-center justify-between bg-[black] bg-opacity-80 text-white ">
              <h1 className="font-bold text-2xl px-6 py-4">
                My All Classes: {myClasses.length}
              </h1>
            </div>
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
                    <th className="text-center">Title</th>
                    <th>Feedback</th>
                    <th>Status</th>
                    <th className="text-center"></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-[#007cff] bg-opacity-10">
                  {/* row 1 */}
                  {myClasses?.map((singleClass, index) => (
                    <tr
                      className="border-b-2 border-gray-500"
                      key={singleClass._id}
                    >
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
                                src={singleClass.classImage}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {singleClass.className.length > 15
                                ? singleClass.className.slice(0, 15) + "..."
                                : singleClass.className}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="max-w-[100px]">
                          {singleClass.reason &&
                          singleClass.reason.length > 15 ? (
                            <>
                              {expanded ? (
                                <>
                                  {singleClass.reason}
                                  <button
                                    onClick={() => setExpanded(false)}
                                    className="text-blue-500 underline py-2"
                                  >
                                    See Less
                                  </button>
                                </>
                              ) : (
                                <>
                                  {singleClass.reason.slice(0, 15)}...
                                  <button
                                    onClick={() => setExpanded(true)}
                                    className="text-blue-500 underline"
                                  >
                                    See More
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            "No feedback"
                          )}
                        </div>
                      </td>
                      <td>{singleClass.status}</td>
                      <td className="">
                        {singleClass?.enrolled
                          ? singleClass.enrolled
                          : "Enrolled: 0"}
                      </td>
                      <th>
                        <Link to="">
                          <button className="btn btn-primary btn-xs text-white">
                            <RiFileEditLine /> Edit
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default MyClasses;
