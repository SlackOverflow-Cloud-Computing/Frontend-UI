import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const composite_service = process.env.REACT_APP_COMPOSITE_SERVICE;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in localStorage");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${composite_service}/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="loading-message">Loading user information...</div>;
  }

  return (
    <div className="profile-container">
      {/* Sidebar with arrow button */}
      <aside className="sidebar">
        <button
          className="arrow-button"
          onClick={() => navigate('/')}
        >
          &#8592;
        </button>
        <h1 className="username">{userData.username || "Username"}</h1>
      </aside>

      {/* Main Profile Information */}
      <section className="profile-info">
        <p><strong>Email:</strong> {userData.email || "example@columbia.edu"}</p>
        <p><strong>Location:</strong> {userData.country || "Location"}</p>
        <p><strong>Account Created:</strong> {formatDate(userData.created_at)}</p>
      </section>
    </div>
  );
};

export default Profile;
