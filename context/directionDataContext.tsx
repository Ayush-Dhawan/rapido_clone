import { createContext, useContext, useState } from "react";

interface DirectionDataContextType {
  directionData: number[][];
  setDirectionData: React.Dispatch<React.SetStateAction<number[][]>>;
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

export const directionDataContext = createContext<DirectionDataContextType>({
  directionData: [],
  setDirectionData: () => {}, // This is a dummy function just to provide a valid initial value for setDirectionData
  distance: 0,
  setDistance: () => {},
  duration: 0,
  setDuration: () => {},
});

function DirectionDataContextProvider({ children }: { children: any }) {
  const [directionData, setDirectionData] = useState<number[][]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  return (
    <directionDataContext.Provider value={{ directionData, setDirectionData, distance, setDistance, duration, setDuration }}>
      {children}
    </directionDataContext.Provider>
  );
}

function useDirectionDataContext() {
  const context = useContext(directionDataContext);
  if (context === undefined)
    throw new Error("direction data context used ourside the provider");
  return context;
}

export {DirectionDataContextProvider, useDirectionDataContext}

