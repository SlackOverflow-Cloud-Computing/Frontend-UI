import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const handleSpotifyConnect = () => {
    // Open Spotify's main website in a new tab
    window.open('https://www.spotify.com', '_blank');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/headphone.png" alt="Headphone Icon" className="headphone-icon" />
      </div>
      <ul className="nav-links">
        <li><a href="#">Playlist Library</a></li>
        <li><a href="#">Top Trends</a></li>
        <li><a href="#">Contact</a></li>
        <li>
          <button className="spotify-button" onClick={handleSpotifyConnect}>
            Connect to my Spotify
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
