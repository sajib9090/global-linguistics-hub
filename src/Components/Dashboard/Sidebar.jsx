import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import UseAllUsers from "../../Hooks/UseAllUers";
// import useAdmin from "../../Hooks/useAdmin";
// import useInstructor from "../../Hooks/useInstructor";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // const [isAdmin] = useAdmin();

  // const [isInstructor] = useInstructor();
  const [students] = UseAllUsers();
  const currentUser = students?.find((users) => users?.email === user?.email);

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Click to expand
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-[#007cff] bg-opacity-20 text-white space-y-4 pt-4 pl-10">
            <div className="flex flex-col justify-center items-center">
              <img
                src={user.photoURL}
                className="rounded-full h-16"
                alt={user.displayName}
              />
              <h3 className="text-black font-bold">{user.displayName}</h3>
            </div>
            {currentUser?.role === "user" ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/mySelectedClass"
                    className={({ isActive }) =>
                      isActive ? "text-white bg-black" : "text-black"
                    }
                  >
                    My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myEnrollmentClasses"
                    className={({ isActive }) =>
                      isActive ? "text-white bg-black" : "text-black"
                    }
                  >
                    My Enrolled Classes
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            {currentUser?.role === "instructor" ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addAClass"
                    className={({ isActive }) =>
                      isActive ? "text-white bg-black" : "text-black"
                    }
                  >
                    Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myClasses"
                    className={({ isActive }) =>
                      isActive ? "text-white bg-black" : "text-black"
                    }
                  >
                    My Classes
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            {currentUser?.role === "admin" ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manageClasses"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-black font-medium"
                        : "text-black font-medium"
                    }
                  >
                    Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-black font-medium"
                        : "text-black font-medium"
                    }
                  >
                    Manage Users
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            <div className="divider"></div>
            <li>
              <Link to="/" className="text-black font-bold">
                Home
              </Link>
            </li>
            <li onClick={handleLogOut} className="text-black font-bold">
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
