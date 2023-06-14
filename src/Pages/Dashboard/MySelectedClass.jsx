import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useCart from "../../Hooks/useCart";

const MySelectedClass = () => {
  // const [axiosSecure] = useAxiosSecure();
  // const { refetch, data: cart = [] } = useQuery({
  //   queryKey: ["/carts/payment-pending", user?.email],
  //   enabled: !loading,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/carts/payment-pending`, {
  //       params: {
  //         email: user?.email,
  //       },
  //     });
  //     console.log("res from axios", res.data);
  //     return res.data;
  //   },
  // });
  const [cart, refetch] = useCart();
  const carts = cart.filter((item) => item.info === "payment pending");
  const subTotal = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  // console.log(cart);
  const handleDelete = (singleCart) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${singleCart.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/carts/${singleCart._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", `${singleCart.name} is deleted`, "success");
            }
          });
      }
    });
  };
  return (
    <>
      {carts && Array.isArray(carts) && carts.length > 0 ? (
        <div>
          <Helmet>
            <title>Global | My Selected Classes</title>
          </Helmet>
          <div className="flex items-center justify-between bg-[black] bg-opacity-80 text-white ">
            <h1 className="font-bold text-2xl px-6 py-4 ">
              My Selected Classes: {carts.length}
            </h1>

            <Link to="/dashboard/payment">
              <h1 className="font-bold text-2xl px-6 py-4 bg-green-600 cursor-pointer">
                Want to Pay? click here
              </h1>
            </Link>
            <h1 className="font-bold text-2xl px-6 py-4">
              Total Price: ${subTotal}
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
              {carts?.map((singleCart, index) => (
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
                    <button
                      onClick={() => handleDelete(singleCart)}
                      className="btn btn-ghost btn-xs bg-[red] text-white"
                    >
                      Delete
                    </button>
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

export default MySelectedClass;
