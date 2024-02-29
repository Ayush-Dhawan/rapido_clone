import { usecostContext } from "@/context/costContext";
import { useDestinationCoordinatesContext } from "@/context/destinationCordContext";
import { useSourceCoordinatesContext } from "@/context/sourceCordContext";
import { SocketAddress } from "net";
import React, { useEffect, useState } from "react";
const mapbox_retrieve_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = "0c2ce491-092b-4ba1-88de-0b9ffad0edac";

export default function Autocomplete() {
  const [source, setSource] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [suggessionList, setSuggessionList] = useState<any>();
  //   const [suggessionList, setsuggessionList] = useState<any>();
  const { sourceCoordinates, setSourceCoordinates } =
    useSourceCoordinatesContext();
  const { destinationCoordinates, setDestinationCoordinates } =
    useDestinationCoordinatesContext();

  const [sourceChange, setSourceChange] = useState<boolean>();
  const [destinationChange, setDestinationChange] = useState<boolean>();
  const { cost, setCost } = usecostContext();

  if (!source || !destination) setCost(0);

  let count: number;

  useEffect(() => {
    console.log("cost -: ", cost);
  }, [cost]);

  useEffect(() => {
    const delayFn = setTimeout(() => {
      getAddressList();
    }, 300);
    count = 0;

    return () => clearTimeout(delayFn);
  }, [source]);

  useEffect(() => {
    const delayFn = setTimeout(() => {
      getAddressList();
    }, 300);
    count = 1;

    return () => clearTimeout(delayFn);
  }, [destination]);

  const getAddressList = async () => {
    const result = await fetch(
      "/api/search-address?q=" + (count === 0 ? source : destination),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const suggessions = await result.json();
    setSuggessionList(suggessions);
    // if (count == 1) setsuggessionList(suggessions);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setSuggessionList([]);
    setSourceChange(false);
    const res = await fetch(
      mapbox_retrieve_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();
    setSourceCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setSuggessionList([]);
    setDestinationChange(false);
    const res = await fetch(
      mapbox_retrieve_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();
    setDestinationCoordinates({
      lng: result?.features[0]?.geometry?.coordinates[0],
      lat: result?.features[0]?.geometry?.coordinates[1],
    });
  };

  return (
    <div className="mt-5">
      <div>
        <label className="text-gray-400">Your Location</label>
        <input
          type="text"
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
            setDestinationChange(false);
          }}
          value={source}
          className="bg-[#343a40] text-white p-1 border-[1px] border-yellow-300 focus:border-yellow-200 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 w-full rounded-md"
        />
        {suggessionList?.searchResult?.suggestions && sourceChange && (
          <div className="shadow-md p-1 rounded-sm absolute">
            {suggessionList?.searchResult?.suggestions.map(
              (item: any, index: number) =>
                item.full_address && (
                  <h2
                    key={index}
                    onClick={() => {
                      setSource((source) => item.full_address);
                      setSuggessionList([]);
                      onSourceAddressClick(item);
                    }}
                    className="p-3 hover:cursor-pointer bg-gray-800 hover:bg-gray-600 rounded-sm"
                  >
                    {item.full_address}
                  </h2>
                )
            )}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label className="text-gray-400">Your Destination</label>
        <input
          type="text"
          onChange={(e) => {
            setDestination(e.target.value);
            setSourceChange(false);
            setDestinationChange(true);
          }}
          value={destination}
          className="bg-[#343a40] text-white p-1 border-[1px] border-yellow-300 focus:border-yellow-200 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 w-full rounded-md"
        />
        {suggessionList?.searchResult?.suggestions && destinationChange && (
          <div className="shadow-md p-1 rounded-sm absolute">
            {suggessionList?.searchResult?.suggestions.map(
              (item: any, index: number) =>
                item.full_address && (
                  <h2
                    key={index}
                    onClick={() => {
                      setDestination((destination) => item.full_address);
                      setSuggessionList([]);
                      onDestinationAddressClick(item);
                    }}
                    className="p-3 hover:cursor-pointer bg-gray-800 hover:bg-gray-600 rounded-sm"
                  >
                    {item.full_address}
                  </h2>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
