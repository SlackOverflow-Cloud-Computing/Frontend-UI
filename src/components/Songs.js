import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import '../styles/Songs.css';

const song_service = process.env.REACT_APP_SONG_SERVICE;

// Convert milliseconds to time in MM:SS format
function msToTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(12);
  const [totalSongs, setTotalSongs] = useState(0);

  // Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const url = `${song_service}?page=${currentPage}&limit=${songsPerPage}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setSongs(data.songs || data);
        setTotalSongs(data.total || data.length || 0);
        setLoading(false);
      } catch (error) {
        setError('Failed to load songs. Please try again later.');
        setLoading(false);
      }
    };

    fetchSongs();
  }, [currentPage, songsPerPage]);

  const handleAddToPlaylist = (song) => {
    const existingPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
  
    // Check if the song is already in the playlist
    if (existingPlaylist.some((s) => s.track_id === song.track_id)) {
      showAlert('You already have this song in your playlist.', 'error');
      return;
    }
  
    // Add the song to the playlist
    const updatedPlaylist = [...existingPlaylist, song];
    localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
    showAlert('Song added to playlist!', 'success');
  };
  
  // Alert function
  const showAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.textContent = message;
  
    document.body.appendChild(alertDiv);
  
    setTimeout(() => {
      alertDiv.remove();
    }, 1000);
  };
  

  // Handle pagination
  const totalPages = Math.ceil(totalSongs / songsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <div className="loading">Loading songs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="songs-page">
      <div className="chatbot-section">
        <Chatbot />
      </div>

      <div className="songs-section">
        <table className="songs-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Album</th>
              <th>Date Added</th>
              <th>BPM</th>
              <th>Danceability</th>
              <th>Length</th>
              <th>Add</th>
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
                  >
                    {song.track_name}
                  </a>
                </td>
                <td>{song.track_album_name}</td>
                <td>{song.track_album_release_date}</td>
                <td>{song.tempo}</td>
                <td>{song.danceability}%</td>
                <td>{msToTime(song.duration_ms)}</td>
                <td>
                  <button
                    onClick={() => handleAddToPlaylist(song)}
                    className="add-button"
                  >
                    Add to Playlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => paginate(1)}>First</button>
          )}
          {currentPage > 3 && <span>...</span>}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const page = currentPage - 2 + i;
            return (
              page > 0 &&
              page <= totalPages && (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              )
            );
          })}
          {currentPage < totalPages - 2 && <span>...</span>}
          {currentPage < totalPages && (
            <button onClick={() => paginate(totalPages)}>Last</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Songs;
