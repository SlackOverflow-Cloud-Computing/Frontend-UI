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

  const handleAboutClick = () => {
    window.location.href = 'http://slackoverflow-bucket.s3-website-us-east-1.amazonaws.com/';
  };

  return (
    <div className="main-content">
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : (
        <>
          <div className="content-container">
            <div className="title-container">
              <h2 className="title">
                <span className="line">Tools to create</span>
                <span className="line highlighted-text">better playlists</span>
              </h2>
            </div>

            <div
              className="image-container"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/playlist.png)`,
              }}
            ></div>
          </div>
          <button className="about-button" onClick={handleAboutClick}>
            About Us
          </button>
        </>
      )}
    </div>
  );
};

export default MainContent;
