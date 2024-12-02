import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Profile from './components/Profile'; // Import Profile component
import Auth from './components/Auth';
import Songs from './components/Songs';
import Chatbot from './components/Chatbot';
import './styles/App.css';  // Import global styles

function Home() {
  return (
    <div className="App">
      <Navbar />
      <MainContent />
    </div>
  );
}

function Chatpage() {
  return (
    <div className="App">
      <Navbar />
      <Chatbot />
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
        {/* Home route ("/") */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* Spotify OAuth callback route */}
        <Route path="/auth" element={<Auth />} />
        <Route path='/songs' element={<SongsPage />} />
        <Route path="/chat" element={<Chatpage />} />
        {/* Default 404 not found */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
