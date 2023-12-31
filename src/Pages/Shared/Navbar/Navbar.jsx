import { Link, NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useAuth from "../../../Hooks/UseAuth";
import { Toaster, toast } from "react-hot-toast";
// import useAdmin from "../../../Hooks/useAdmin";
// import useInstructor from "../../../Hooks/useInstructor";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import UseAllUsers from "../../../Hooks/UseAllUers";
// import axios from "axios";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const { logOut, user, loading } = useAuth();
  // const [cart] = useCart();
  const [students] = UseAllUsers();
  const currentUser = students?.find((users) => users?.email === user?.email);
  // console.log("hfdhdfjkhfh", currentUser);

  // const [isAdmin] = useAdmin();
  // const [isInstructor] = useInstructor();

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Success.");
  };

  // console.log(user);
  // const [axiosSecure] = useAxiosSecure();
  // const { data: cart = [] } = useQuery({
  //   queryKey: ["/carts/payment-pending", user?.email],
  //   enabled: !loading,
  //   queryFn: async () => {
  //     const res = await axios(`/carts/payment-pending`, {
  //       params: {
  //         email: user?.email,
  //       },
  //     });
  //     // console.log("res from axios", res.data);
  //     return res.data;
  //   },
  // });
  // console.log(cart);
  const [cart] = useCart();
  const carts = cart.filter((item) => item.info === "payment pending");

  const subTotal = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#007CFF]" : "text-black"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/instructors"
          className={({ isActive }) =>
            isActive ? "text-[#007CFF]" : "text-black"
          }
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            isActive ? "text-[#007CFF]" : "text-black"
          }
        >
          Classes
        </NavLink>
      </li>
      {user && user ? (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-[#007CFF]" : "text-black"
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className="mb-16">
      <div className="navbar bg-white text-black z-[999] fixed top-0 left-0">
        <div className="navbar-start w-[50%]">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/">
            <a className="btn ml-auto md:ml-0 btn-ghost normal-case text-base md:text-xl">
              Global Linguistics Hub
            </a>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6 text-[16px]">
            {navOptions}
          </ul>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
        {currentUser?.role === "user" ? (
          <div className="dropdown dropdown-end ml-auto">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {carts.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{carts.length} Items</span>
                <span className="text-info">Subtotal: ${subTotal}</span>
                <div className="card-actions">
                  <Link to="/dashboard/mySelectedClass">
                    <button className="btn btn-primary bg-[#007CFF] border-none btn-block">
                      View cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          {user && user ? (
            <div className="dropdown dropdown-end ml-auto">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img referrerPolicy="no-referrer" src={user.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    {user.displayName}
                    {/* <span className="badge">New</span> */}
                  </a>
                </li>
                {/* <li>
                  <a>Settings</a>
                </li> */}
                <li onClick={handleLogOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#007CFF] mx-2 flex items-center"
                  : "mx-2 text-black flex items-center"
              }
            >
              <RxAvatar className="mr-1" />
              Login
            </NavLink>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
