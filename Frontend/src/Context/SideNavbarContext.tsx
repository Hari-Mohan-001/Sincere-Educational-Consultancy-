import React, { createContext, useContext, useState } from "react";

type NavContextType = {
    activeButton:number|null;
    setActiveButton:(value:number|null)=>void
}

const NavContext = createContext<NavContextType |undefined>(undefined)

export const NavProvider :React.FC<{ children: React.ReactNode }> = ({children})=>{
    const[activeButton, setActiveButton] = useState<number|null>(null)

  return (
    <NavContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav =()=>{
    const context = useContext(NavContext)
    if (context === undefined) {
        throw new Error('useNav must be used within a NavProvider');
      }
      return context;
      
}