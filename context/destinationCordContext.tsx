import { createContext, useContext, useState } from "react";

interface coordinate  {
  lng: number,
  lat: number
}

export const destinationCordContext = createContext<any>(null);

function DestinationCordContextProvider({ children }: { children: any }) {
  const [destinationCoordinates, setDestinationCoordinates] = useState<coordinate>();
  return (
    <destinationCordContext.Provider
      value={{ destinationCoordinates, setDestinationCoordinates }}
    >
      {children}
    </destinationCordContext.Provider>
  );
}

function useDestinationCoordinatesContext() {
  const context = useContext(destinationCordContext);
  if (context === undefined)
    throw new Error("destination cord context used ourside the provider");
  return context;
}

export { useDestinationCoordinatesContext, DestinationCordContextProvider };

