import useAuth from "../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Pages/Shared/Loader/Loader";
import useAdmin from "../Hooks/useAdmin";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useAdmin();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return <Loader />;
  }
  if (user && isInstructor) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
