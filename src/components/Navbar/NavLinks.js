import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./navbar.scss";
import { motion } from "framer-motion";

function NavLinks({ isMobile, closeMobileMenu }) {
  const animationFrom = { opacity: 0, x: 200 };
  const animateTo = { opacity: 1, x: 0 };

  return (
    <motion.div
      initial={animationFrom}
      animate={animateTo}
      className="nav-links"
    >
       <div
        initial={animationFrom}
        animate={animateTo}
        className="search-bar"
      >
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
        Logout
      </p>
    </motion.div>
  );
}

export default NavLinks;
