import React, { useEffect, useRef, useState } from "react";
import "./timer.scss";
import { HiPlay, HiPause, HiStop } from "react-icons/hi";
import useInterval from "../../hooks/useInterval";

function Timer() {
  const progressRef = useRef();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [totalTime, setTotalTime] = useState(1);

  const timer = () => {
    setSeconds(seconds + 1);
    const removeAnimation = 628 / (totalTime * 60);
    let calculatedOffSet = removeAnimation * (minutes * 60 + (seconds + 1));
    progressRef.current.style.strokeDashoffset = `${calculatedOffSet}`;

    if (seconds === 59) {
      setMinutes(minutes + 1);
      setSeconds(0);
    }

    if (minutes === totalTime) {
      progressRef.current.style.strokeDashoffset = `628`;
      setSeconds(0);
      setIsStart(false);
    }
  };

  useInterval(timer, isStart ? 1000 : null); //sets setinterval 

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
