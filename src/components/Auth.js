// src/components/Auth.js

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { jwtDecode } from 'jwt-decode';

const login_service = process.env.REACT_APP_LOGIN_SERVICE;

const Auth = () => {
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    // Parse the authorization code from the URL
    const queryParams = queryString.parse(window.location.search);
    const authCode = queryParams.code;

    if (!authCode) {
      console.error("Authorization code missing in redirect");
      return;
    }

    // Define an async function to handle the fetch request
    const sendLoginRequest = async () => {
      try {
        const response = await fetch(login_service, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ auth_code: authCode }),
        });

        // Check if the response is not successful
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Successfully sent login request to integration service");
        console.log(data);

        if (data) {
          localStorage.setItem('jwt', data);
          const decoded = jwtDecode(data);
          const userId = decoded.sub;
          localStorage.setItem('user_id', userId);
          console.log("User ID and JWT stored in localStorage:", userId, data);
        }

        // Navigate to the next page if successful
        window.history.replaceState(null, '', '/'); // Clear auth code from URL
        navigate('/'); // Replace with dashboard or other path
      } catch (error) {
        console.error("Failed to send login request:", error);
        alert("There was an issue connecting to the login service. Please try again later.");

        // Clear any login-related data and reset the URL to allow retry
        localStorage.clear();
        sessionStorage.clear();

        // Clear the auth code from the URL and redirect back to home to allow retry
        window.history.replaceState(null, '', '/');
        console.log("I got here22!");
        navigate('/');
      }
    };

    // Now that we have the auth code, try to send it to the integration service
    sendLoginRequest();
  }, [navigate]);

  return <div>Handling Spotify authentication...</div>;
}

export default Auth;
