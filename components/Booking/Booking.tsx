"use client";
import React from "react";
import Autocomplete from "./Autocomplete";
import Cars from "./Cars";
import Cards from "./Cards";
import { usecostContext } from "@/context/costContext";
import { useRouter } from "next/navigation";

export default function Booking() {
  const { cost, setCost } = usecostContext();
  const router: any = useRouter();

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        style={{ height: "80vh" }}
        className="border-[1px] border-gray-700 p-5 rounded-md"
      >
        <Autocomplete />
        <Cars />
        <Cards />
        <button
          className={` text-slate-700 p-3 w-full rounded-md hover:scale-105 transition-all mt-4 ${
            cost === 0
              ? "cursor-not-allowed bg-gray-400 text-gray-200"
              : "cursor-pointer bg-yellow-400"
          }`}
          onClick={() => router.push('/confirmed')}
          disabled={cost === 0}
        >
          Book now
        </button>
      </div>
    </div>
  );
}
