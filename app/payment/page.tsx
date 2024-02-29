
"use client";
import React from "react";
import CheckOutForm from "@/components/Payment/CheckOutForm";
import { usecostContext } from "@/context/costContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Payment() {
  //   const { cost } = usecostContext();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
  );

  const options: any = {
    mode: "payment",
    amount: 50,
    currency: "inr",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm />
    </Elements>
  );
}