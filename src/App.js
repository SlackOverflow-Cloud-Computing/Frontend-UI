import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Auth from './components/Auth'
import './styles/App.css';  // Import global styles

function Home() {
  return (
    <div className="App">
      <Navbar />
      <MainContent />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route ("/") */}
        <Route path="/" element={<Home />} />

        {/* Spotify OAuth callback route */}
        <Route path="/auth" element={<Auth />} />

        {/* Default 404 not found */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
export default App;
