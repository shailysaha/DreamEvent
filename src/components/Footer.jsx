import { Link } from "react-router";
import { FiInstagram, FiLinkedin, FiStar} from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <Link to="/" className="footer-brand">
            <FiStar />
            DreamEventAI
          </Link>

          <p>
            AI-inspired event design for unforgettable celebrations.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/planner">AI Planner</Link>
          <Link to="/inspiration">Inspiration</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="Instagram">
            <FiInstagram />
          </a>

          <a href="#" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 DreamEventAI. Frontend portfolio project.
      </div>
    </footer>
  );
}

export default Footer;