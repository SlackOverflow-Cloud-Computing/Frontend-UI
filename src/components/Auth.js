import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';


const user_service = 'http://127.0.0.1:8000/login';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the authorization code from the URL
    const queryParams = queryString.parse(window.location.search);
    const authCode = queryParams.code;

    if (authCode) {
      // Now that we have the auth code, send it to the integration service
      fetch(user_service, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth_code: authCode }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log("Login failed", data.error);
        } else {
          console.log("Login successful", data);
          navigate('/'); // Go back to home for now
        }
      });
    }
  }, [navigate]);

  return <div>Handling Spotify authentication...</div>;
}

export default Callback;
