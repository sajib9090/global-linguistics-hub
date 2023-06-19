import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm2 from "../../Components/CheckoutForm2";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment2 = () => {
  const { user } = useAuth();
  //
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const singleCart = JSON.parse(queryParams.get("cart"));
  console.log(singleCart);
  return (
    <div className="bg-[#abd2fb] py-12 px-6 w-[100%]">
      <Helmet>
        <title>Global | Payment</title>
      </Helmet>
      <div>
        <p className="text-lg">
          Name: <span className="font-bold">{user.displayName}</span>
        </p>
        <p className="text-lg">
          Email:: <span className="font-bold">{user.email}</span>
        </p>
        <p className="text-base mb-6">
          Price: <span className="font-bold">{singleCart.price}</span>
        </p>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm2 singleCart={singleCart} price={singleCart.price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment2;
