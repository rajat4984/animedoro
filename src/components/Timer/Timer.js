import React, { useRef, useState } from "react";
import "./timer.scss";
import { HiPlay, HiPause, HiStop } from "react-icons/hi";
import useInterval from "../../hooks/useInterval";

function Timer() {
  const progressRef = useRef();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [isStart, setIsStart] = useState(false);
  const [totalTime, setTotalTime] = useState(1);

  const timer = () => {
    const removeAnimation = 628 / (totalTime * 60);
    let calculatedOffSet = removeAnimation * (minutes * 60 + seconds - 1);
    progressRef.current.style.strokeDashoffset = `${calculatedOffSet}`;
    setSeconds(seconds - 1);

    if (minutes === 0 && seconds === 0) {
      progressRef.current.style.strokeDashoffset = `0`;
      setSeconds(0);
      setMinutes(totalTime);
      setIsStart(false);
    }

    if (seconds === 0 && minutes !== 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
  };

  useInterval(timer, isStart ? 1000 : null); //sets setinterval

  const stopTimer = () => {
    setSeconds(0);
    setMinutes(totalTime);
    setIsStart(false);
    progressRef.current.style.strokeDashoffset = 0;
  };

  const handleSelect = (e) => {
    setTotalTime(Number(e.target.value));
    setMinutes(Number(e.target.value));
  };
  return (
    <div className="timer">
      <select
        onChange={(e) => handleSelect(e)}
        name="cars"
        className="selectTime"
      >
        <option value="1">1 Minute</option>
        <option value="40">40 Minutes</option>
        <option value="60">60 Minutes</option>
      </select>
      <h3 className="break-text">Time to focus!! 🎮</h3>
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
    </div>
  );
}

export default Timer;
