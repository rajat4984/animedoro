import React, { useEffect, useRef, useState } from "react";
import "./timer.scss";
import { HiPlay, HiPause, HiStop } from "react-icons/hi";

function Timer() {
  const progressRef = useRef();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [totalTime,setTotalTime] = useState(1);

  // timer = setInterval(intervalFunction, 1000);

  const startTimer = () => {
    // const mySeconds = Number(totalTime.slice(3, 5));
    // const myMinutes = Number(totalTime.slice(0, 2));
    // progressRef.current.style.strokeDashoffset = "628";
    // progressRef.current.style.animation = `offset ${
    //   myMinutes * 60 + mySeconds
    // }s linear forwards`;
    // const timer = setInterval(() => {
    //   setSeconds((prevSec) => prevSec + 1);
    //   if (seconds === 10) {
    //     setMinutes(minutes + 1);
    //     setSeconds(0);
    //   }
    // }, 1000);
    // if (seconds === 10) {
    //   clearInterval(timer);
    // }
  };

  useEffect(() => {
    let intervalId = null;
    if (isStart) {
      intervalId = setInterval(() => {
        setSeconds((prevSec) => {
          const removeAnimation = 628/(totalTime*60)
          let calculatedOffSet = removeAnimation*(prevSec+1);
          progressRef.current.style.strokeDashoffset = `${calculatedOffSet}`;
          if (prevSec === 59) {
            setMinutes(minutes+1)
            setSeconds(0);
          }

          if(prevSec === totalTime*60){
            clearInterval(timerId);
            setIsStart(false);
            return prevSec;
          }
          return prevSec + 1;
        });
      }, 1000);
      setTimerId(intervalId);
    } else {
      clearInterval(timerId);
    }
  }, [isStart]);


  const getMinutes = ()=>{
    return minutes;
  }

  const stopTimer = () => {
    setSeconds(0);
    setMinutes(0);
    setIsStart(false);
    progressRef.current.style.strokeDashoffset = 0;
  };
  return (
    <>
      <div className="circle">
        <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(110,110)">
            <circle r="100" className="e-c-base" />
            <g transform="rotate(-90)">
              <circle r="100" className="e-c-progress" ref={progressRef} />
            </g>
          </g>
        </svg>
        <div className="controlls">
          <div className="display-remain-time">
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
        </div>
      </div>
      <div className="buttons">
        <HiPlay
          onClick={() => {
            // startTimer();
            setIsStart(true);
          }}
          className="playBtn"
        />
        <HiStop onClick={stopTimer} className="stopBtn" />
        <HiPause
          onClick={() => {
            setIsStart(false);
          }}
          className="passBtn"
        />
      </div>
    </>
  );
}

export default Timer;
