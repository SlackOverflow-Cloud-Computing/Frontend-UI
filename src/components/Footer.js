import React from 'react';
import '../styles/Footer.css'; // Make sure you're importing the correct styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/assets/x-icon.png" alt="X" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/assets/instagram-icon.png" alt="Instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

