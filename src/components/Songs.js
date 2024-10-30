import React, { useState, useEffect } from 'react';
import '../styles/Songs.css';

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
        const response = await fetch(
          `http://localhost:8081/songs?page=${currentPage}&limit=${songsPerPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSongs(data.songs || data);
        setTotalSongs(data.total || (data?.length || 0));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Failed to load songs. Please try again later.');
        setLoading(false);
      }
    };

    fetchSongs();
  }, [currentPage, songsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalSongs / songsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const maxButtons = 5; // Maximum number of page buttons to show
    const pages = [];
    
    if (totalPages <= maxButtons) {
      // If total pages is less than max buttons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // If current page is near the start
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // If current page is in the middle
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Scroll to top when changing page
    }
  };

  if (loading) {
    return <div className="songs-loading">Loading songs...</div>;
  }

  if (error) {
    return <div className="songs-error">{error}</div>;
  }

  return (
    <div className="songs-container">
      <h2>Available Songs</h2>
      <div className="songs-grid">
        {songs.map((song) => (
          <div key={song.track_id} className="song-card">
            <div className="song-info">
              <h3>{song.track_name}</h3>
              <p>Artist: {song.track_artist}</p>
              <p>Album: {song.track_album_name}</p>
              <p>Release Date: {song.track_album_release_date}</p>
              <p>Popularity: {song.track_popularity}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {getPageNumbers().map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={`ellipsis-${index}`} className="ellipsis">...</span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </button>
            )
          ))}
        </div>

        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Songs;
