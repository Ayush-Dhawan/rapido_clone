import React, { useEffect, useRef } from "react";
import { Map, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { useUserLocation } from "@/context/userLocationContext";
import { useSourceCoordinatesContext } from "@/context/sourceCordContext";
import { useDestinationCoordinatesContext } from "@/context/destinationCordContext";
import { useDirectionDataContext } from "@/context/directionDataContext";
import MapRoute from "./MapRoute";
import DistanceTime from "./DistanceTime";

export default function MapboxMap() {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const MAPBOX_DRIVING_ENDPOINT =
    "https://api.mapbox.com/directions/v5/mapbox/driving/";
  const session_token = "0c2ce491-092b-4ba1-88de-0b9ffad0edac";

  const { userloc, setUserLoc } = useUserLocation();
  const { sourceCoordinates, setSourceCoordinates } =
    useSourceCoordinatesContext();
  const { destinationCoordinates, setDestinationCoordinates } =
    useDestinationCoordinatesContext();
  const {
    directionData,
    setDirectionData,
    distance,
    setDistance,
    duration,
    setDuration,
  } = useDirectionDataContext();

  const mapRef = useRef<any>();

  // useEffect(() => console.log(directionData), [directionData]);

  //flu to source marker
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2000,
      });
    }
  }, [sourceCoordinates]);

  //fly to user location
  useEffect(() => {
    if (userloc) {
      mapRef.current?.flyTo({
        center: [userloc?.lng, userloc?.lat],
        duration: 2000,
      });
    }
  }, [destinationCoordinates]);

  //fly to destination markr
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2000,
      });
    }

    if (sourceCoordinates && destinationCoordinates) getDirectionRoute();
  }, [destinationCoordinates]);

  //api.mapbox.com/directions/v5/mapbox/driving/72.95%2C19.17%3B73.25%2C19.33?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiYXl1c2hkaGF3YW4iLCJhIjoiY2x0MWs4dDR0MHV6bzJtbnJmcjV2Zm42dSJ9.okH9Bi1KoA-70wH7_9WZ2g

  const getDirectionRoute = async () => {
    const res = await fetch(
      `${MAPBOX_DRIVING_ENDPOINT}${sourceCoordinates?.lng},${sourceCoordinates?.lat};${destinationCoordinates?.lng},${destinationCoordinates?.lat}?overview=full&geometries=geojson&access_token=${accessToken}`
    );

    const result = await res.json();
    setDirectionData(result.routes[0].geometry.coordinates);
    setDistance(result.routes[0].distance);
    setDuration(result.routes[0].duration);
  };

  return (
    <div className="p-5 text-[20px] font-semibold">
      <h2>Map</h2>
      <div className="rounded-lg overflow-hidden">
        <Map
          mapboxAccessToken={mapboxAccessToken}
          ref={mapRef}
          initialViewState={{
            longitude: userloc?.lng || 72.88,
            latitude: userloc?.lat || 19.07,
            zoom: 12,
          }}
          style={{ width: "100%", height: 585, borderRadius: "10px" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
          {directionData && <MapRoute coordinates={directionData} />}
        </Map>
        <div className="absolute bottom-[40px] z-20 right-[50px] text-black hidden md:block">
          <DistanceTime />
        </div>
      </div>
    </div>
  );
}
