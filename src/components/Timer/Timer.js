import React, { useEffect, useRef, useState } from "react";
import "./timer.scss";
import { HiPlay, HiPause, HiStop } from "react-icons/hi";

function Timer() {
  const progressRef = useRef();
  const [totalTime, setTotalTime] = useState("01:00");
  const [timer, setTimer] = useState("00:00");

  const startTimer = () => {
    const seconds = Number(totalTime.slice(3, 5));
    const minutes = Number(totalTime.slice(0, 2));
    progressRef.current.style.strokeDashoffset = "628";
    progressRef.current.style.animation = `offset ${
      minutes * 60 + seconds
    }s linear forwards`;
  };

  const pauseTimer = () => {
    console.log(progressRef.current.style.animationDuration);
  };

  const stopTimer = () => {
    setTotalTime("00:00");
    progressRef.current.style.animation = `offset 0s linear forwards`;
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
          <div className="display-remain-time">{timer}</div>
        </div>
      </div>
      <div className="buttons">
        <HiPlay onClick={startTimer} className="playBtn" />
        <HiStop onClick={stopTimer} className="stopBtn" />
        <HiPause onClick={pauseTimer} className="passBtn" />
      </div>
    </>
  );
}

export default Timer;
