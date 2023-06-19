import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MySelectedClass from "../Pages/Dashboard/MySelectedClass";
import MyEnrolledClasses from "../Pages/Dashboard/MyEnrolledClasses";
import AddAClass from "../Pages/Dashboard/AddAClass";
import MyClasses from "../Pages/Dashboard/MyClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import Classes from "../Pages/Home/Classes";
import AdminRoute from "./AdminRoute";

import Payment from "../Pages/Dashboard/Payment";
import Instructors from "../Pages/Home/Instructors";
import Payment2 from "../Pages/Dashboard/Payment2";

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
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/classes",
        element: <Classes />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/classes/approved`),
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
        element: (
          <PrivateRoute>
            <MySelectedClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myEnrollmentClasses",
        element: (
          <PrivateRoute>
            <MyEnrolledClasses />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment2",
        element: (
          <PrivateRoute>
            <Payment2 />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageClasses",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageClasses />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
