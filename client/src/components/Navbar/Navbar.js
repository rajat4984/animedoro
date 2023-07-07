import React from "react";
import "./navbar.scss";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="brand-name">
          <h1>
            Animedoro
          </h1>
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
