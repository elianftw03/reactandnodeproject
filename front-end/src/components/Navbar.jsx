import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, toggleDarkMode }) {
  const { isLoggedIn, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="nav-header">
        <h1>
          <Link to="/">BCards</Link>
        </h1>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={closeMenu}>
          <Link to="/cards">All Cards</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/about">About</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/favorites">Favorites</Link>
        </li>

        {isLoggedIn && user?.role === "business" && (
          <>
            <li onClick={closeMenu}>
              <Link to="/my-cards">My Cards</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li className="greeting" onClick={closeMenu}>
              <span>
                Hello, {user.firstName}{" "}
                <small style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                  ({user.role})
                </small>
              </span>
            </li>
            <li className="logout" onClick={closeMenu}>
              <button onClick={logout} className="logout-button">
                Sign Out
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li className="signin" onClick={closeMenu}>
              <Link to="/login">Sign In</Link>
            </li>
            <li className="signup" onClick={closeMenu}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}

        <li onClick={closeMenu}>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? "Light" : "Dark"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
