import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import './Profile.css';

const Profile = () => {
  const { userData, logout } = useContext(UserContext);

  if (userData === null) {
    return <p>Loading...</p>; // Add a loading state or redirect the user if needed
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
