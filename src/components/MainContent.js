import React, { useState } from 'react';
import '../styles/MainContent.css';

const chat_info = process.env.REACT_APP_CHAT_INFO;

const MainContent = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatInfo, setChatInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMockMode, setIsMockMode] = useState(true); // Toggle between mock mode and API mode

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (isMockMode) {
      // Mock mode: Just show "Submitted successfully!" and skip API call
      setChatInfo({
        id: inputValue,
        title: "Mock Title",
        description: "Mock description: Submitted successfully!"
      });
      setErrorMessage("");
    } else {
      // Original code: API call to fetch chat info
      try {
        const response = await fetch(chat_info + inputValue);
        if (response.ok) {
          const data = await response.json();
          setChatInfo(data);
          setErrorMessage(""); // Clear error message if the request is successful
        } else {
          setErrorMessage("Failed to fetch chat info. Please try again.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="main-content">
      <div className="overlay">
        <h1>ChatOverSlack</h1>
        <p>create your personalized playlist</p>
        <form onSubmit={handleSubmit} className="input-section">
          <input 
            type="text" 
            placeholder="Enter chat ID" 
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {errorMessage && <p className="error">{errorMessage}</p>}

        {chatInfo && (
          <div className="chat-info">
            <h3>Chat Info:</h3>
            <p>ID: {chatInfo.id}</p>
            <p>Title: {chatInfo.title}</p>
            <p>Description: {chatInfo.description}</p>
          </div>
        )}
      </div>

      {/* Toggle button to switch between mock mode and real API mode */}
      <button onClick={() => setIsMockMode(!isMockMode)}>
        {isMockMode ? "Switch to API Mode" : "Switch to Mock Mode"}
      </button>
    </div>
  );
}

export default MainContent;
