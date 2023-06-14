import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";

const MyEnrolledClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: cart = [] } = useQuery({
    queryKey: ["/carts/payment-done", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/payment-done`, {
        params: {
          email: user?.email,
        },
      });
      console.log("res from axios", res.data);
      return res.data;
    },
  });
  const subTotal = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);

  return (
    <>
      {cart && Array.isArray(cart) && cart.length > 0 ? (
        <div>
          <div className="flex items-center justify-between bg-[black] bg-opacity-80 text-white ">
            <h1 className="font-bold text-2xl px-6 py-4 ">
              Total Purchases Class: {cart.length}
            </h1>

            <h1 className="font-bold text-2xl px-6 py-4">
              Total Spending: ${subTotal}
            </h1>
          </div>
          <div className="overflow-x-auto"></div>
          <table className="table">
            {/* head */}
            <thead className="bg-[#007cff] bg-opacity-20">
              <tr>
                <th>
                  <label>
                    <p>#</p>
                  </label>
                </th>
                <th className="text-center">Name</th>

                <th>Payment Info</th>
                <th className="text-center">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-[#007cff] bg-opacity-10">
              {/* row 1 */}
              {cart?.map((singleCart, index) => (
                <tr className="border-b-2 border-gray-500" key={singleCart._id}>
                  <th>
                    <label>
                      <p>{index + 1}</p>
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={singleCart.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {singleCart?.name?.length > 20
                            ? singleCart.name.slice(0, 20)
                            : singleCart.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{singleCart.info}</td>
                  <td className="">${singleCart.price}</td>
                  <th>
                    {/* <button className="btn btn-ghost btn-xs bg-[red] text-white">
                      Delete
                    </button> */}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-center text-5xl">No classes found</h1>
        </div>
      )}
    </>
  );
};

export default MyEnrolledClasses;
