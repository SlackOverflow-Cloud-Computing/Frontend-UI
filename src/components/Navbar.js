import React from 'react';
import '../styles/Navbar.css';
import querystring from 'query-string';


// Consts for Spotify API
const client_id = '227e62927fd54c35a4fbcaef0b81936b';
const redirect_uri = 'http://localhost:3000/auth';
const scope = 'user-read-private user-read-email';


function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


const Navbar = () => {
  const handleSpotifyConnect = () => {
    // Open Spotify's main website in a new tab
    const state = generateRandomString(16);

    const authURL = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      });

    // Redirect the user to the Spotify login page
    window.location.href = authURL;
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
