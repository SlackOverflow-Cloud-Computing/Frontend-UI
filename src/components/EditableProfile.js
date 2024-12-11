import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditableProfile.css';

const EditableProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    motto: '',
    favoriteSong: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userData')) || {
        username: 'Tsz Yat Wong',
        email: 'tw3047@columbia.edu',
        country: 'US',
        created_at: '2024-12-10T22:19:43',
      };
      setUserData(storedUserData);

      const storedEditableData = JSON.parse(localStorage.getItem('editableProfileData')) || {
        motto: 'Always learning.',
        favoriteSong: 'Imagine - John Lennon',
      };
      setEditableData(storedEditableData);
    };

    fetchUserData();
  }, []);

  // Handle changes in editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('editableProfileData', JSON.stringify(editableData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const storedEditableData = JSON.parse(localStorage.getItem('editableProfileData'));
    setEditableData(storedEditableData || { motto: '', favoriteSong: '' });
    setIsEditing(false);
  };

  if (!userData) {
    return <div className="loading-message">Loading profile...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button
            className="arrow-button"
            onClick={() => navigate('/')}
            aria-label="Return to main page"
        >
            ←
        </button>
        <h1 className="sidebar-title">Tsz Yat Wong</h1>
</aside>


      {/* Profile Content */}
      <section className="profile-content">
        <div className="profile-box">
          <h1>My Profile</h1>
          {isEditing ? (
            <>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Location:</strong> {userData.country}
              </p>
              <p>
                <strong>Account Created:</strong> {formatDate(userData.created_at)}
              </p>
              <p>
                <strong>Motto:</strong>{' '}
                <input
                  type="text"
                  name="motto"
                  value={editableData.motto}
                  onChange={handleChange}
                  className="editable-input"
                />
              </p>
              <p>
                <strong>Favorite Song:</strong>{' '}
                <input
                  type="text"
                  name="favoriteSong"
                  value={editableData.favoriteSong}
                  onChange={handleChange}
                  className="editable-input"
                />
              </p>
              <div className="button-group">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Location:</strong> {userData.country}
              </p>
              <p>
                <strong>Account Created:</strong> {formatDate(userData.created_at)}
              </p>
              <p>
                <strong>Motto:</strong> {editableData.motto}
              </p>
              <p>
                <strong>Favorite Song:</strong> {editableData.favoriteSong}
              </p>
              <button
                className="save-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditableProfile;
