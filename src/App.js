import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Recepten from './Recepten';
import Dagboek from './Dagboek';
import Profile from './Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTransition, setShowTransition] = useState(false);

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

  return (
    <div className="App">
      {showTransition && <div className="page-transition" />}
      <nav className="top-navbar">
        <div className="logo-left">
          <img src="/jbwjelogo.png" alt="logo" />
        </div>
        <div className="logo-middle">
          <h2>JBWJE</h2>
        </div>
        <div className="logo-right">
        <button onClick={() => setCurrentPage('Profile')}>
          <img src="/profile.png" alt="profile" class="profile" />
        </button>        
        </div>
      </nav>
      {renderPage()}
      <nav className="bottom-navbar">
        <ul>
          <li>
            <button onClick={() => setCurrentPage('home')}>
              <img src="/home (1).png" alt="home" class="homebutton" />
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('recepten')}>
              <img
                src="/recipe-book.png"
                alt="recepten"
                class="receptenbutton"
              />
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('dagboek')}>
              <img src="/open-book.png" alt="dagboek" class="dagboekbutton" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
