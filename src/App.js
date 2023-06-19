import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Recepten from './Recepten';
import Dagboek from './Dagboek';
import Profile from './Profile'
import Login from './Login';
import Register from './Register';
import { UserProvider } from './UserContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTransition, setShowTransition] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'recepten':
        return <Recepten />;
      case 'dagboek':
        return <Dagboek />;
      case 'Profile':
        return <Profile />;
      case 'Login':
        return <Login />;
      case 'Register':
        return <Register />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    setShowTransition(true);
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownClick = (page) => {
    setCurrentPage(page);
    toggleDropdown();
  };

  const handleLogout = () => {
    // Perform logout logic here
    setCurrentPage('home');
  };

  return (
    <UserProvider>
      <div className="App">
        {showTransition && <div className="page-transition" />}
        <nav className="top-navbar">
          <div className="logo-left">
            <button onClick={() => setCurrentPage('Home')}>
              <img src="/jbwjelogo.png" alt="logo" />
            </button>
          </div>
          <div className="logo-middle"></div>
          <div className="logo-right">
            <div className="dropdown">
              <button className="dropdown-button" onClick={toggleDropdown}>
                <img src="/profile.png" alt="profile" className="profile" />
              </button>
              {dropdownVisible && (
                <div className="dropdown-content">
                  <button onClick={() => handleDropdownClick('Profile')}>
                    Profile
                  </button>
                  <button onClick={() => handleDropdownClick('Login')}>
                    Login
                  </button>
                  <button onClick={() => handleDropdownClick('Register')}>
                    Register
                  </button>
                  <button onClick={handleLogout} className="logout-button">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        {renderPage()}
        <nav className="bottom-navbar">
          <ul>
            <li>
              <button onClick={() => setCurrentPage('home')}>
                <img src="/home (1).png" alt="home" className="homebutton" />
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('recepten')}>
                <img
                  src="/recipe-book.png"
                  alt="recepten"
                  className="receptenbutton"
                />
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('dagboek')}>
                <img src="/open-book.png" alt="dagboek" className="dagboekbutton" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </UserProvider>
  );
}

export default App;
