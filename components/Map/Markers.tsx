import React from "react";
import { Marker } from "react-map-gl";
import { useUserLocation } from "@/context/userLocationContext";
import { useSourceCoordinatesContext } from "@/context/sourceCordContext";
import { useDestinationCoordinatesContext } from "@/context/destinationCordContext";

export default function Markers() {
  const { userloc } = useUserLocation();
  const { sourceCoordinates } = useSourceCoordinatesContext();
  const { destinationCoordinates } = useDestinationCoordinatesContext();

  return (
    <div>
      {/* user loc marker */}
      <Marker longitude={userloc?.lng} latitude={userloc?.lat} anchor="bottom">
        <img src="./destination_cords.png" alt="source" className="w-10 h-10" />
      </Marker>

      {/* source marker */}
      {sourceCoordinates && (
        <Marker
          longitude={sourceCoordinates?.lng}
          latitude={sourceCoordinates?.lat}
          anchor="bottom"
        >
          <img src="./source_cords.png" alt="source" className="w-10 h-10" />
        </Marker>
      )}

      {/* destination marker */}
      {destinationCoordinates && (
        <Marker
          longitude={destinationCoordinates?.lng}
          latitude={destinationCoordinates?.lat}
          anchor="bottom"
        >
          <img src="./user_src.png" alt="source" className="w-10 h-10" />
        </Marker>
      )}
    </div>
  );
}
