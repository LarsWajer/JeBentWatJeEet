import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import './Profile.css';

const Profile = () => {
  const { userData, logout } = useContext(UserContext);

  const deleteAccount = () => {
    // Delete the user account from local storage
    localStorage.removeItem('user');

    // Call the logout function to clear the user data in the context
    logout();
  };

  if (userData === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='profile-container'>
          <div className='profile-info'>
            <img
              className='profile-picture'
              src='profile.png'
              alt='Profile'
            />
            <h2 className='profile-name'>Welcome, {userData.name}!</h2>
            <p className='profile-email'>Email: {userData.email}</p>
            <button className='deleteButton' onClick={deleteAccount}>
              Delete Account
            </button>
            <button className='logoutButton' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
