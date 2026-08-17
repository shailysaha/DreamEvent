import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  FiMenu,
  FiX,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <FiStar />
          </span>

          <span>
            DreamEvent<span>AI</span>
          </span>
        </Link>

        <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <NavLink to="/" className={getLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink
            to="/inspiration"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Inspiration
          </NavLink>

          <NavLink
            to="/planner"
            className={getLinkClass}
            onClick={closeMenu}
          >
            AI Planner
          </NavLink>

          <NavLink
            to="/dashboard"
            className={getLinkClass}
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>

          <Link
            to="/planner"
            className="navbar-button"
            onClick={closeMenu}
          >
            Start Designing
            <FiArrowRight />
          </Link>
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;