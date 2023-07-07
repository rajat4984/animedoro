import React, { useState } from "react";
import NavLinks from "./NavLinks";
import "./navbar.scss";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";

function Mobile() {
  const [open, setOpen] = useState(false);

  const closeMobileMenu = () => setOpen(false);
  return (
    <div className="mobile-navigation">
      {open ? (
        <VscClose onClick={() => setOpen(!open)} className="hamburger" />
      ) : (
        <HiOutlineMenuAlt3
          onClick={() => setOpen(!open)}
          className="hamburger"
        />
      )}
      <div className="mobile-navigation-links">{open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu}  />}</div>
    </div>
  );
}

export default Mobile;