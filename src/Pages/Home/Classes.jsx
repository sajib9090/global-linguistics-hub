import { useLoaderData, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAllUsers from "../../Hooks/UseAllUers";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  const approvedClasses = useLoaderData();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [cart, refetch] = useCart();

  const [axiosSecure] = useAxiosSecure();
  const { data: pendingCart = [], refetch: pendingRefetch } = useQuery({
    queryKey: ["/carts/payment-pending", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/payment-pending`, {
        params: {
          email: user?.email,
        },
      });
      console.log("res from axios", res.data);
      return res.data;
    },
  });

  const handleBuy = (approvedClass) => {
    if (user && user.email) {
      const cartItem = {
        classId: approvedClass._id,
        name: approvedClass.className,
        image: approvedClass.classImage,
        price: approvedClass.price,
        email: user.email,
        info: "payment pending",
      };
      fetch(`${import.meta.env.VITE_API_URL}/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            pendingRefetch();
            refetch();

            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Class added successfully to my selected classes",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login First",
        text: "You won't added cart without login/signUp",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  // console.log(approvedClasses);
  const isEnrolled = (classId) =>
    cart.some(
      (item) => item.classId === classId && item.info === "payment pending"
    );
  // const [isAdmin] = useAdmin();
  // const [isInstructor] = useInstructor();
  const [students] = UseAllUsers();
  const currentUser = students?.find((users) => users?.email === user?.email);

  return (
    <div>
      <Helmet>
        <title>Global | Classes</title>
      </Helmet>
      <div>
        <h1 className="text-center font-bold text-3xl pt-8">All Classes</h1>
      </div>
      <div className="mt-24 grid md:grid-cols-4 gap-10">
        {approvedClasses &&
          approvedClasses?.map((approvedClass) => (
            <div
              key={approvedClass._id}
              className="card bg-[#0086FF] bg-opacity-20 shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={approvedClass.classImage}
                alt=""
                className="card-img h-[300px] object-cover"
              />
              <div className="card-body  p-4">
                <h3 className="card-title text-2xl font-bold mb-2">
                  {approvedClass.className.length > 30
                    ? approvedClass.className.slice(0, 30) + "..."
                    : approvedClass.className}
                </h3>
                <div className="card-text">
                  <p className="text-lg mb-2">
                    <strong>Instructor:</strong> {approvedClass.instructorName}
                  </p>

                  <p className="text-lg mb-2">
                    <strong>Available Seats:</strong>{" "}
                    {approvedClass.availableSeats}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>Price:</strong> ${approvedClass.price}
                  </p>
                </div>
                <div className="mt-auto">
                  {currentUser?.role === "admin" ||
                  currentUser?.role === "instructor" ? (
                    <button
                      disabled
                      onClick={() => handleBuy(approvedClass)}
                      className="btn bg-[#61BCF2] text-white hover:text-black"
                    >
                      Buy now
                    </button>
                  ) : (
                    <button
                      disabled={isEnrolled(approvedClass._id)}
                      onClick={() => handleBuy(approvedClass)}
                      className="btn bg-[#61BCF2] text-white hover:text-black"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Classes;
