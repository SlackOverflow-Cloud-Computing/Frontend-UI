import React, { useState, useEffect } from 'react';
import '../styles/Songs.css';

const song_service = process.env.REACT_APP_SONG_SERVICE;

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
        const url =`${song_service}?page=${currentPage}&limit=${songsPerPage}`
        console.log("Fetching songs from:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSongs(data.songs || data);
        console.log(data);
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

  function msToTime(ms) {
      // Convert milliseconds to seconds
      let seconds = Math.floor(ms / 1000);
      
      // Calculate minutes and remaining seconds
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;

      // Format to "MM:SS"
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  return (
    <div className="playlist-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="playlist-info">
          <div className="playlist-cover">
            {/* Replace with dynamic images */}
            <img src="/assets/cover-image-url.png" alt="Playlist Cover" />
          </div>
          <h3>Playlist Name</h3>
          <p>Songs to listen to while coding in the cloud</p>
        </div>
      </aside>

      {/* Main Section */}
      <div className="playlist-content">
        {/* Top bar with settings */}
        {/* <div className="top-bar">
          <h2>Available Songs</h2>
          <button className="settings-button">Settings</button>
        </div> */}

        {/* Song Table */}
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
                <td><a href={`https://open.spotify.com/track/${song.track_id}`} target="_blank" rel="noopener noreferrer">{song.track_name}</a></td>
                <td>{song.track_album_name}</td>
                <td>{song.track_album_release_date}</td>
                <td>{song.tempo}</td>
                <td>{song.danceability}%</td>
                <td>{msToTime(song.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

        {/* Graph Section */}
        {/* <div className="graph-container">
          <p>Graph Placeholder</p>
        </div> */}
      </div>
    </div>

    // <div className="songs-container">
    //   <h2>Available Songs</h2>
    //   <div className="songs-grid">
    //     {songs.map((song) => (
    //       <div key={song.track_id} className="song-card">
    //         <div className="song-info">
    //           <h3>{song.track_name}</h3>
    //           <p>Artist: {song.track_artist}</p>
    //           <p>Album: {song.track_album_name}</p>
    //           <p>Release Date: {song.track_album_release_date}</p>
    //           <p>Popularity: {song.track_popularity}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
      
    //   <div className="pagination">
    //     <button 
    //       onClick={() => paginate(currentPage - 1)}
    //       disabled={currentPage === 1}
    //       className="pagination-button"
    //     >
    //       Previous
    //     </button>
        
    //     <div className="page-numbers">
    //       {getPageNumbers().map((pageNumber, index) => (
    //         pageNumber === '...' ? (
    //           <span key={`ellipsis-${index}`} className="ellipsis">...</span>
    //         ) : (
    //           <button
    //             key={pageNumber}
    //             onClick={() => paginate(pageNumber)}
    //             className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
    //           >
    //             {pageNumber}
    //           </button>
    //         )
    //       ))}
    //     </div>

    //     <button 
    //       onClick={() => paginate(currentPage + 1)}
    //       disabled={currentPage === totalPages}
    //       className="pagination-button"
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
};

export default Songs;
