import { createContext, useContext, useState } from "react";

interface coordinate {
  lng: number;
  lat: number;
}

export const sourceCordContext = createContext<any>(null);

function SourceCordContextProvider({ children }: { children: any }) {
  
  const defaultCoordinate: coordinate = { lng: 0, lat: 0 }; // Default coordinate
  const [sourceCoordinates, setSourceCoordinates] = useState<coordinate>(defaultCoordinate); // Setting default value

  return (
    <sourceCordContext.Provider
      value={{ sourceCoordinates, setSourceCoordinates }}
    >
      {children}
    </sourceCordContext.Provider>
  );
}

function useSourceCoordinatesContext() {
  const context = useContext(sourceCordContext);
  if (context === undefined)
    throw new Error("source cord context used ourside the provider");
  return context;
}

export { useSourceCoordinatesContext, SourceCordContextProvider };
