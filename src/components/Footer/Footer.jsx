import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const nav = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-title">UniTrack</h2>
          <p className="footer-text">
            Helping students report, recover, and reconnect with lost items.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li>Home</li>
            <li>Lost Items</li>
            <li>Found Items</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Report Buttons */}
        <div className="footer-section">
          <h3 className="footer-heading">Report</h3>
          <button onClick={() => nav("/report-item")} className="footer-btn">
            Report Lost Item
          </button>
          <button
            onClick={() => nav("/report-item")}
            className="footer-btn secondary"
          >
            Report Found Item
          </button>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3 className="footer-heading">Connect</h3>
          <div className="footer-socials">
            <a href="https://www.instagram.com/nikhill.py" target="_blank">
              Instagram
            </a>
            <a href="https://github.com/NikhilBhattt" target="_blank">
              GitHub
            </a>
            <a href="mailto:nikhilbhatt220705@gmail.com">Email</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Campus Lost & Found · All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
