import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./navbar.scss";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";

function NavLinks({ isMobile, closeMobileMenu }) {
  const { totalTime, setTotalTime, minutes, setMinutes, handleSelectTime } =
    useGlobalContext();

  const animationFrom = { opacity: 0, x: 200 };
  const animateTo = { opacity: 1, x: 0 };

  return (
    <motion.div
      initial={animationFrom}
      animate={animateTo}
      className="nav-links"
    >
      <div initial={animationFrom} animate={animateTo} className="search-bar">
        <input type="text" placeholder="Search anime" />
        <button
          onClick={() => {
            isMobile && closeMobileMenu();
          }}
        >
          <BiSearchAlt />
        </button>
      </div>
      <p
        onClick={() => {
          isMobile && closeMobileMenu();
        }}
      >
        My Watchlist
      </p>
      <p
        onClick={() => {
          isMobile && closeMobileMenu();
        }}
      >
        Login with mal
      </p>
      <p>
        {isMobile && (
          <select
            onChange={(e) => {
              handleSelectTime(e);
              closeMobileMenu();
            }}
            className="selectTime"
          >
            <option value="1">1 Minute</option>
            <option value="40">40 Minutes</option>
            <option value="60">60 Minutes</option>
          </select>
        )}
      </p>
    </motion.div>
  );
}

export default NavLinks;
