import { FiHeart, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <FiHeart className="logo-icon" />
              <span>ShaadiBio</span>
            </div>
            <p className="footer-tagline">
              Create beautiful marriage biodata profiles in minutes. 
              Share your story with elegance and grace.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
            <div className="footer-column">
              <h4>Features</h4>
              <a href="/create">Create BioData</a>
              <a href="/dashboard">View Templates</a>
              <a href="/">PDF Export</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="/">Help Center</a>
              <a href="/">Contact Us</a>
              <a href="/">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ShaadiBio. All rights reserved.</p>
          <div className="footer-social">
            <a href="/" aria-label="Twitter"><FiTwitter /></a>
            <a href="/" aria-label="Instagram"><FiInstagram /></a>
            <a href="/" aria-label="GitHub"><FiGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
