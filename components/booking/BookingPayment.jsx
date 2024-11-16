"use client";

import { useRecoilState } from "recoil";
import { paymentDetailsAtom } from "@/app/_state/states";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SideBar from "./SideBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import apiService from "@/app/_api/apiService";

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY || "pk_test_51Nk3XVADEjNInJHV2wz6Plyqiby3A5FkksGboywyA6i6QzMznRWEsihvwHHtd3QFZu4MbJtM9wQTRSGTWxqnfhIe00sltwnZwW"); // Replace with your Stripe public key

function PaymentForm() {
  const [paymentDetails, setPaymentDetails] = useRecoilState(paymentDetailsAtom);
  const [errors, setErrors] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.cardName) {
      newErrors.cardName = "Cardholder Name is required";
    }
    if (!paymentDetails.agree) {
      newErrors.agree = "You must accept the Terms & Conditions.";
    }
    return newErrors;
  };

  const initiatePayment = async () => {
    try {
      if (!stripe || !elements) {
        console.error("Stripe.js has not loaded yet.");
        return;
      }

      // Create a payment method using the card details
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: paymentDetails.cardName,
        },
      });

      if (error) {
        console.error("Error creating payment method:", error.message);
        setErrors({ stripe: error.message });
        return;
      }

      // Send the payment method ID to your backend
      const response = await apiService.post("/payment/cars/test",
        {
          Token: paymentMethod.id,
          amount: 4000, // Amount in the smallest currency unit
          currency: "usd",
        }
      );

      if (response.clientSecret) {
        handlePayment(response.clientSecret);
      } else {
        console.error("Payment failed:", response.message);
      }
    } catch (error) {
      console.error("Error during payment:", error.message);
    }
  };

  async function handlePayment(clientSecret) {
    const stripe = await stripePromise;

    // Confirm the PaymentIntent
    const result = await stripe.confirmCardPayment(clientSecret);

    if (result.error) {
      // Handle payment failure
      console.error("Payment failed:", result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      // Payment succeeded
      router.push("/booking-received");
    }
  }

  const handleContinueClick = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      await initiatePayment();
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="box-tab-left">
      <div className="box-content-detail">
        <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
          Payment Details
        </h3>
        <div className="form-contact form-comment wow fadeInUp">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="form-label" htmlFor="cardName">Card Holder Name</label>
                <input
                  className="form-control"
                  id="cardName"
                  type="text"
                  name="cardName"
                  value={paymentDetails.cardName}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardName: e.target.value })
                  }
                />
                {errors.cardName && <p className="error">{errors.cardName}</p>}
              </div>
            </div>

            <div className="form-group">
              {/* <label>Card Details</label> */}
              <CardElement className="form-control" />
              {errors.stripe && <p className="error">{errors.stripe}</p>}
            </div>
          </div>
          <div className="mt-30">
            <label htmlFor="agree-cb">
              <input
                className="cb-agree"
                id="agree-cb"
                type="checkbox"
                checked={paymentDetails.agree}
                onChange={(e) => {
                  setPaymentDetails({ ...paymentDetails, agree: e.target.checked });
                }}
              />
              I accept the Terms & Conditions - Booking Conditions and Privacy Policy.
            </label>
            {errors.agree && <p className="error">{errors.agree}</p>}
          </div>
          <div className="mt-30 mb-120">
            <button
              className="btn btn-primary btn-primary-big w-100"
              onClick={handleContinueClick}
              disabled={!stripe || !elements}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPayment() {
  useEffect(() => {
    activeInputFocus();
  }, []);

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
