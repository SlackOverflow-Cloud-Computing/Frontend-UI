import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // No need to import Link
import '../styles/Navbar.css';
import querystring from 'query-string';
import '../styles/Profile.css';

// Consts for Spotify API
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId); // Set isLoggedIn to true if user_id exists
  }, []);

  const handleSpotifyConnect = () => {
    const state = generateRandomString(16);
    const authURL =
      'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      });

    // Redirect the user to the Spotify login page
    window.location.href = authURL;
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.clear();

    // Update the login state
    setIsLoggedIn(false);

    // Redirect to home page
    window.location.href = '/';
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToSongs = () => {
    navigate('/songs');
  };

  const goToMyPlaylist = () => {
    navigate('/my-playlist'); // Matches the route defined in App.js
  };

  const goToHome = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="navbar">
      {/* Revert Subwoofer to original style */}
      <h1 className="logo" onClick={goToHome}>
        Subwoofer
      </h1>
      <button className="spotify-button" onClick={goToSongs}>
        Songs
      </button>
      {isLoggedIn ? (
        <>
          <button className="spotify-button" onClick={goToProfile}>
            Profile
          </button>
          <button className="spotify-button" onClick={goToMyPlaylist}>
            My Playlist
          </button>
          <button className="spotify-button" onClick={handleLogout}>
            Log Out
          </button>
        </>
      ) : (
        <button className="spotify-button" onClick={handleSpotifyConnect}>
          Sign In with Spotify
        </button>
      )}
    </nav>
  );
};

export default Navbar;
