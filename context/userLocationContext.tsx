"use client";
import { useContext, useEffect, useState, createContext } from "react";

interface Location {
  lat: number;
  lng: number;
}


const UserLocationContext = createContext<Location | any>({});

function UserLocationProvider({ children }: { children: any }) {
  const defaultCoordinate: Location = { lng: 0, lat: 0 }; // Default coordinate
  const [userloc, setUserLoc] = useState<Location>(defaultCoordinate);

  useEffect(() => {
    getUserLoc();
  }, []);

  const getUserLoc = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLoc({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <UserLocationContext.Provider value={{ userloc, setUserLoc }}>
      {children}
    </UserLocationContext.Provider>
  );
}

function useUserLocation() {
  const context = useContext(UserLocationContext);
  if (context === undefined)
    throw new Error("useUserLocation used ourside the provider");
  return context;
}

export { useUserLocation, UserLocationProvider };
