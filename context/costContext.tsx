import { createContext, useContext, useState } from "react";


export const costContext = createContext<any>(null);

function CostContextProvider({children} : {children: any}){
    const [cost, setCost] = useState<number>(0);

    return(
        <costContext.Provider value={{cost, setCost}}>
            {children}
        </costContext.Provider>
    )
}

function usecostContext() {
  const context = useContext(costContext);
  if (context === undefined)
    throw new Error("cost context used ourside the provider");
  return context;
}

export {usecostContext, CostContextProvider}