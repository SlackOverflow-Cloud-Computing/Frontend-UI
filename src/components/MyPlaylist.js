import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import '../styles/MyPlaylist.css';

const MyPlaylist = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setSongs(storedPlaylist);
  }, []);

  const handleRemoveSong = (trackId) => {
    const updatedPlaylist = songs.filter((song) => song.track_id !== trackId);
    setSongs(updatedPlaylist);
    localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
    showAlert('Song removed from playlist!', 'success');
  };

  const showAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 1000);
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar */}
      <div className="playlist-page">
        <h1>My Playlist</h1>
        {songs.length === 0 ? (
          <p className="empty-playlist">Your playlist is empty.</p>
        ) : (
          <table className="playlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Date Released</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr key={song.track_id}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={`https://open.spotify.com/track/${song.track_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotify-link"
                    >
                      {song.track_name}
                    </a>
                  </td>
                  <td>{song.track_album_name}</td>
                  <td>{song.track_album_release_date}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveSong(song.track_id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyPlaylist;
