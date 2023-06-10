import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Home/Secret";
import DashboardLayout from "../Layout/DashboardLayout";
import MySelectedClass from "../Pages/Dashboard/MySelectedClass";
import MyEnrolledClasses from "../Pages/Dashboard/MyEnrolledClasses";
import AddAClass from "../Pages/Dashboard/AddAClass";
import MyClasses from "../Pages/Dashboard/MyClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/mySelectedClass",
        element: <MySelectedClass />,
      },
      {
        path: "/dashboard/myEnrollmentClasses",
        element: <MyEnrolledClasses />,
      },
      {
        path: "/dashboard/addAClass",
        element: <AddAClass />,
      },
      {
        path: "/dashboard/myClasses",
        element: <MyClasses />,
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers />,
        loader: () => fetch("http://localhost:5000/students"),
      },
      {
        path: "/dashboard/manageClasses",
        element: <ManageClasses />,
      },
    ],
  },
]);
