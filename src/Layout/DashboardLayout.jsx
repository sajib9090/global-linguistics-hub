import { Helmet } from "react-helmet-async";
import Sidebar from "../Components/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Helmet>
        <title>Global | Dashboard</title>
      </Helmet>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
