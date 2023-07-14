import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [totalTime, setTotalTime] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [breakSessions, setBreakSessions] = useState({ sessions: 0 });
  const [workSessions, setWorkSessions] = useState({ sessions: 0 });
  const [isBreak, setIsBreak] = useState(false);
  const [codeChallenge, setCodeChallenge] = useState("");

  const progressRef = useRef();

  const handleCodeChallenge = async () => {
    console.log("lez go");
    function dec2hex(dec) {
      return ("0" + dec.toString(16)).substr(-2);
    }

    function generateRandomString() {
      let array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec2hex).join("");
    }

    const challenge = generateRandomString();

    if(!(sessionStorage.getItem("codeChallenge"))){
      sessionStorage.setItem("codeChallenge",challenge);
    }

    setCodeChallenge(challenge); //code challenge and verifier are same in this authentication
  };

  useEffect(() => {
    handleCodeChallenge();
  }, []);

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
        progressRef,
        workSessions,
        setWorkSessions,
        breakSessions,
        setBreakSessions,
        isBreak,
        setIsBreak,
        codeChallenge
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
