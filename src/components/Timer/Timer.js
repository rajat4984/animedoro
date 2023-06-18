import React from "react";
import "./timer.scss";
import { HiPlay, HiPause, HiStop } from "react-icons/hi";

function Timer() {
  return (
    <>
      <div className="circle">
        <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(110,110)">
            <circle r="100" class="e-c-base" />
            <g transform="rotate(-90)">
              <circle r="100" class="e-c-progress" />
              <g id="e-pointer">
                <circle cx="100" cy="0" r="8" class="e-c-pointer" />
              </g>
            </g>
          </g>
        </svg>
        <div class="controlls">
          <div class="display-remain-time">00:30</div>
        </div>
      </div>
      <div className="buttons">
        <HiPlay className="playBtn" />
        <HiStop className="stopBtn" />
        <HiPause className="passBtn" />
      </div>
    </>
  );
}

export default Timer;
