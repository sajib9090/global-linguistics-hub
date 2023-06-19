import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../Hooks/UseAuth";
import useCart from "../Hooks/useCart";
import axios from "axios";

const CheckoutForm2 = ({ price, singleCart }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cart] = useCart();
  const carts = cart.filter((item) => item.info === "payment pending");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);

    // if (paymentIntent.status === "succeeded") {
    //   setTransactionId(paymentIntent.id);
    //   const transactionId = paymentIntent.id;

    //   //-----------------------
    //   const matchedCartItem = carts.find((cartItem) => cartItem._id === singleCart._id);

    //   toast.success("payment done");
    // }
    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      setTransactionId(paymentIntent.id);

      const matchedCartItem = carts.find(
        (cartItem) => cartItem._id === singleCart._id
      );

      if (matchedCartItem) {
        // Update the cart item status to "payment done"
        const updateResult = await axiosSecure.put(
          `/carts/${matchedCartItem._id}`,
          {
            info: "payment done",
          }
        );

        if (updateResult.data.success) {
          toast.success("Payment done. Cart item updated.");

          // Make an additional API request to update class information
          try {
            const classUpdateResult = await axios.patch(
              `/classes/${matchedCartItem.classId}`,
              {
                // Specify the properties you want to update
                // For example, if you want to decrease available seats and increase enrollment count
                availableSeats: matchedCartItem.availableSeats - 1, // Decrease available seats
                enrollment: matchedCartItem.enrollment + 1, // Increase enrollment count
              }
            );

            // Handle the response from the "classes" API
            if (classUpdateResult.data.success) {
              toast.success("Class information updated.");
            } else {
              toast.error("Failed to update class information.");
            }
          } catch (error) {
            toast.error(
              "Failed to make the request to update class information."
            );
            console.error(error);
          }
        } else {
          toast.error("Failed to update cart item.");
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="bg-[green] text-white px-4 py-1 rounded-sm"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600">{cardError}</p>}
      {transactionId && (
        <p className="text-green-600">
          <span className="text-black">Your transactionId :</span>{" "}
          {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm2;
