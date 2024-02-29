"use client";
import Booking from "@/components/Booking/Booking";
import MapboxMap from "@/components/Map/Map";
import { UserLocationProvider } from "@/context/userLocationContext";
import { SourceCordContextProvider } from "@/context/sourceCordContext";
import { DestinationCordContextProvider } from "@/context/destinationCordContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DirectionDataContextProvider } from "@/context/directionDataContext";
import { CostContextProvider } from "@/context/costContext";


export default function Home() {

 

  return (
    <>
      <CostContextProvider>
        <DirectionDataContextProvider>
          <DestinationCordContextProvider>
            <SourceCordContextProvider>
              <UserLocationProvider>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div>
                    <Booking />
                  </div>
                  <div className="col-span-2">
                    <MapboxMap />
                  </div>
                </div>
              </UserLocationProvider>
            </SourceCordContextProvider>
          </DestinationCordContextProvider>
        </DirectionDataContextProvider>
      </CostContextProvider>
    </>
  );
}
