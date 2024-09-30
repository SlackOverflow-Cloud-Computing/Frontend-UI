import React, { useState } from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    alert("Submitted successfully!");
    setInputValue(""); // Clears the input field after submission
  };

  return (
    <div className="main-content">
      <div className="overlay">
        <h1>ChatOverSlack</h1>
        <p>create your personalized playlist</p>
        <form onSubmit={handleSubmit} className="input-section">
          <input 
            type="text" 
            placeholder="type your request here..." 
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainContent;
