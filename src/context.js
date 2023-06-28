import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [totalTime, setTotalTime] = useState(1);
  const [minutes, setMinutes] = useState(1);

  const handleSelectTime = (e) => {
    setTotalTime(Number(e.target.value));
    setMinutes(Number(e.target.value));
  };
  return (
    <AppContext.Provider
      value={{ totalTime, setTotalTime, minutes, setMinutes,handleSelectTime }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
