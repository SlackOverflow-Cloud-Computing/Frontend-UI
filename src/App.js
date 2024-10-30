import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
<<<<<<< HEAD
import Profile from './components/Profile'; // Import Profile component
import Auth from './components/Auth';
=======
import Footer from './components/Footer';
import Auth from './components/Auth'
import Songs from './components/Songs';
>>>>>>> 8f640a9497cbed077a58f067cae157651668f2e8
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
        <Route path="/profile" element={<Profile />} />
        {/* Spotify OAuth callback route */}
        <Route path="/auth" element={<Auth />} />

        <Route path='/songs' element={<Songs />} />
        
        {/* Default 404 not found */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
