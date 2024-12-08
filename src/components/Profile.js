import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Retrieve user_id from localStorage
  const userId = localStorage.getItem('user_id');
  console.log("Retrieved user ID from localStorage:", userId);

  // Initialize the navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in localStorage");
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for user ID:", userId);

        // Make the fetch call to the user info endpoint
        const response = await fetch(`http://127.0.0.1:8088/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data retrieved:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="profile-container">
      {/* Sidebar for navigation links */}
      <aside className="sidebar">
        <h1 className="username">{userData.username || "Username"}</h1>
        <nav>
          <ul>
            <li>
              {/* When clicked, navigate back to the main page */}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                Return
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area for user information */}
      <section className="profile-info">
        <p><strong>Email:</strong> {userData.email || "example@columbia.edu"}</p>
        <p><strong>Location:</strong> {userData.country || "Location"}</p>
      </section>
    </div>
  );
};

export default Profile;
