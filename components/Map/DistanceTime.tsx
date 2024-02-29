import { useDirectionDataContext } from "@/context/directionDataContext";
import React from "react";

export default function DistanceTime() {
  const {
    directionData,
    setDirectionData,
    distance,
    setDistance,
    duration,
    setDuration,
  } = useDirectionDataContext();

  const shouldRender = distance !== 0 && duration !== 0;

  return (
    shouldRender && (
      <div className="bg-yellow-500 p-3 rounded-md">
        <h2 className="text-yellow-100 opacity-80 text-[15px]">
          Distance:{" "}
          <span className="font-bold mr-3 text-black">
            {(distance / 1000).toFixed(2)}Kms
          </span>
        </h2>
        <h2 className="text-yellow-100 opacity-80 text-[15px]">
          Duration:{" "}
          <span className="font-bold mr-3 text-black">
            {(duration / 3600).toFixed(2)}hours
          </span>
        </h2>
      </div>
    )
  );
}
