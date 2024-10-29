// src/components/MainContent.js

import React, { useState, useEffect } from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/playlist.png`;
    image.onload = () => setIsLoading(false);
    image.onerror = () => setIsLoading(false);
  }, []);

  return (
    <div className="main-content">
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : (
        <div className="content-container">
          <div className="title-container">
            <h2 className="title">
              <span className="line">Tools to create</span>
              <span className="line highlighted-text">better playlists</span>
            </h2>
          </div>

          {/* Apply the background image dynamically */}
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/playlist.png)`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
