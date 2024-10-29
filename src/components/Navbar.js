import React from 'react';
import '../styles/Navbar.css';
import querystring from 'query-string';

// Consts for Spotify API
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI; // This is also used in adapter for validation
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
      <h1 className="logo">Subwoofer</h1>
      <button className="spotify-button" onClick={handleSpotifyConnect}>
        Sign In with Spotify
      </button>
    </nav>
  );
};

export default Navbar;
