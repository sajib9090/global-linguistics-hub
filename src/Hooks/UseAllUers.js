import { useQuery } from "@tanstack/react-query";
const UseAllUsers = () => {
  const {
    data: students = [],
    refetch,
    isLoading: loading,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/students`);
      return res.json();
    },
  });
  return [students, refetch, loading];
};
export default UseAllUsers;
