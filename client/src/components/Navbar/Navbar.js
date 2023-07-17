import React from "react";
import "./navbar.scss";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="brand-name">
          <Link to="/">
          <h1>
            Animedoro
          </h1>
          </Link>
        </div>
        <div className="nav-links">
          <Desktop/>
         <Mobile/>

        </div>
      </nav>
    </div>
  );
}

export default Navbar;
