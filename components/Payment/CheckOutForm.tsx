"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

export default function CheckOutForm() {
  const stripe: any = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (elements === null) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("error submitting payment form");
      return;
    }
    // vcreate payment intent and get client secret
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: 50,
      }),
    });

    const secret_key = await res.json();
    console.log(secret_key);

    const { error } = await stripe.confirmPayment({
      clientSecret: secret_key,
      //  elements instance which was used to createthe payment
      elements,

      confirmParams: {
        return_url: "https://localhost:3000",
      },
    });
  };
  return (
    <div className="flex items-center justify-center w-screen mt-6">
      <form onSubmit={(e) => handleSubmit(e)} className="">
        <PaymentElement />
        <button
          className="p-2 bg-yellow-400 w-full text-center rounded-md mt-3 "
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
    </div>
  );
}
