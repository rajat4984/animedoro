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
      <p
        onClick={() => {
          isMobile && closeMobileMenu();
        }}
      >
        Change time
      </p>
      <p
        onClick={() => {
          isMobile && closeMobileMenu();
        }}
      >
        Change unit
      </p>
    </motion.div>
  );
}

export default NavLinks;
