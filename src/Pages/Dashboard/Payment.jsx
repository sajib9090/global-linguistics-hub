import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: cart = [] } = useQuery({
    queryKey: ["/carts/payment-pending", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/payment-pending`, {
        params: {
          email: user?.email,
        },
      });
      //   console.log("res from axios", res.data);
      return res.data;
    },
  });
  const subTotal = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const price = parseFloat(subTotal);
  //   console.log(price);
  return (
    <div className="bg-[#abd2fb] h-[100vh] py-28 pl-10 w-[100%]">
      <div>
        <h1 className="text-lg mb-12">
          Total: <span className="font-bold">${subTotal}</span>
        </h1>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} cart={cart} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
