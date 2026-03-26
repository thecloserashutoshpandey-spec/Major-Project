import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        Code<span>Collab</span> 🚀
      </Link>

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>

        <Link
          to="/editor/123"
          className={location.pathname.includes("/editor") ? "active" : ""}
        >
          Editor
        </Link>

        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          Contact
        </Link>
      </div>

      {/* AUTH BUTTONS */}
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="signup">Signup</button>
      </div>

    </div>
  );
}

export default Navbar;