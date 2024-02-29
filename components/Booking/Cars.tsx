import React, { useEffect, useState } from "react";
import carList from "./carList";
import Image from "next/image";
import { useDirectionDataContext } from "@/context/directionDataContext";
import { usecostContext } from "@/context/costContext";
import { useSourceCoordinatesContext } from "@/context/sourceCordContext";
import { useDestinationCoordinatesContext } from "@/context/destinationCordContext";

export default function Cars() {
  const [selectedVehicle, setSelectedVehicle] = useState<number>();
  const {
    directionData,
    setDirectionData,
    distance,
    setDistance,
    duration,
    setDuration,
  } = useDirectionDataContext();

  const { cost, setCost } = usecostContext();
  const { sourceCoordinates, setSourceCoordinates } =
    useSourceCoordinatesContext();
  const { destinationCoordinates, setDestinationCoordinates } =
    useDestinationCoordinatesContext();

  // useEffect(() => console.log(cost), [cost]);

  const getDistanceinKms = (meters: number) => {
    return meters / 1000;
  };

  const getCost = (price: number) => {
    const cost = getDistanceinKms(distance) * price;
    return parseFloat(cost.toFixed(2));
  };



  const handleClick = (carId: number) => {
    if (sourceCoordinates && destinationCoordinates) {
      setSelectedVehicle(carId);
      const selectedCar = carList?.find((car) => car?.id === carId);
      if (selectedCar) {
        setCost(getCost(selectedCar.price));
      }
    }
  };

  return (
    <div>
      <h2 className="font-semibold mt-4">Select Vehicle</h2>
      <ul className="grid grid-cols-3 p-2">
        {carList.map((car) => (
          <li
            key={car.id}
            onClick={() => handleClick(car.id)}
            className={`m-3 p-2 border-[1px] border-gray-500 rounded-md hover:border-yellow-400 hover:scale-105 transition-all duration-2000 cursor-pointer ${
              car.id === selectedVehicle && "bg-yellow-200 text-slate-800"
            }`}
          >
            <Image
              src={car.image}
              alt={car.name + "image"}
              height={75}
              width={90}
              className="w-[70%]"
            />
            <h2>{car.name}</h2>
            {distance !== 0 && (
              <span className="float-right">{getCost(car.price)}₹</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
