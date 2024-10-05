import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';


const user_service = 'http://127.0.0.1:8000/login';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the authorization code from the URL
    const queryParams = queryString.parse(window.location.search);
    const authCode = queryParams.code;
    if (!authCode) {
      console.error("Authorization code missing");
      return;
    }

    // Now that we have the auth code, send it to the integration service
    fetch(user_service, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth_code: authCode }),
    });

    console.log("Sent Login Request to Service");
    navigate('/');

  }, [navigate]);

  // I don't know how to fix the console error, looks like this is being called twice
  // for some reason

  return <div>Handling Spotify authentication...</div>;
}

export default Auth;
