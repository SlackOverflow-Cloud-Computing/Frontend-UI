import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot'; // Import the chatbot component
import '../styles/Songs.css'; // Ensure updated styles are imported

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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const url = `${song_service}?page=${currentPage}&limit=${songsPerPage}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

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

  const totalPages = Math.ceil(totalSongs / songsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const renderPagination = () => {
    const maxButtons = 5;
    const pageNumbers = [];

    if (currentPage > 1) {
      pageNumbers.push(
        <button key="first" onClick={() => paginate(1)}>
          First
        </button>
      );
    }

    if (currentPage > 3) {
      pageNumbers.push(<span key="ellipsis-start">...</span>);
    }

    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(<span key="ellipsis-end">...</span>);
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button key="last" onClick={() => paginate(totalPages)}>
          Last
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading) return <div className="loading">Loading songs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="songs-page">
      <div className="chatbot-section">
        <div className="chatbot-container">
          <Chatbot />
        </div>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default Songs;
