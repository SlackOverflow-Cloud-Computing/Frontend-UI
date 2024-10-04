import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

function Callback() {
  const navigate = useNavigate();
  console.log("TEST");

  useEffect(() => {
    // Parse the authorization code from the URL
    const queryParams = queryString.parse(window.location.search);
    const authCode = queryParams.code;

    if (authCode) {
      // Now that we have the auth code, send it to the integration service
      fetch('/api/auth/spotify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: authCode }),
      })
      .then(response => response.json())
      .then(data => {
        // You might want to save tokens or navigate to a different page
        navigate('/'); // Redirect back to home, or wherever you'd like
      });
    }
  }, [navigate]);

  return <div>Handling Spotify authentication...</div>;
}

export default Callback;
