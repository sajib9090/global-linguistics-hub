// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./UseAuth";

// const axiosSecure = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}`,
// });

// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const { logOut } = useAuth();
//   useEffect(() => {
//     // intercept request client ------> server
//     axiosSecure.interceptors.request.use((config) => {
//       const token = `Bearer ${localStorage.getItem("access-token")}`;
//       if (token) {
//         config.headers.Authorization = token;
//       }
//       return config;
//     });

//     // intercept response server ------> client
//     axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response.status === 401 || error.response.status === 403) {
//           await logOut();
//           navigate("/login");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [logOut, navigate, axiosSecure]);

//   return [axiosSecure];
// };

// export default useAxiosSecure;

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { logOut } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
