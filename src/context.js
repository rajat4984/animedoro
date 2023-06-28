import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [totalTime, setTotalTime] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const progressRef = useRef();

  const handleSelectTime = (e) => {
    setIsStart(false);
    setSeconds(0);
    setTotalTime(Number(e.target.value));
    setMinutes(Number(e.target.value));
    progressRef.current.style.strokeDashoffset = 0;

  };
  return (
    <AppContext.Provider
      value={{
        totalTime,
        setTotalTime,
        minutes,
        setMinutes,
        handleSelectTime,
        isStart,
        setIsStart,
        seconds,
        setSeconds,
        progressRef
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
