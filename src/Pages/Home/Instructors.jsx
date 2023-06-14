import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";
import InstructorCard from "./InstructorCard";

const Instructors = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: allStudents = [], refetch } = useQuery({
    queryKey: ["/students"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/students`, {});
      console.log("res from axios", res.data);
      return res.data;
    },
  });

  const instructors = allStudents.filter(
    (student) => student.role === "instructor"
  );
  // console.log(instructors);
  return (
    <div className="mt-[150px]">
      <div className="text-center">
        <h1 className="text-[40px] font-bold mb-4 tracking-[10px]">
          All Instructors
        </h1>
        <p className="text-base font-extralight ">We have lovely instructors</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {instructors?.map((instructor) => (
          <InstructorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
