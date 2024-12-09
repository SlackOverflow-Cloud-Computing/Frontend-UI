import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Profile from './components/Profile'; 
import Auth from './components/Auth';
import Songs from './components/Songs';
import MyPlaylist from './components/MyPlaylist'; // Import My Playlist component
import './styles/App.css';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <MainContent />
    </div>
  );
}

function SongsPage() {
  return (
    <div className="App">
      <Navbar />
      <Songs />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
