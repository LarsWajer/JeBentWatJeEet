import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTransition, setShowTransition] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
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
          <h1>profile</h1>
        </div>
        <div className="logo-middle">
          <h1>JBWJE</h1>
        </div>
        <div className="logo-right">
          <img src="/jbwjelogo.png" alt="logo" />
        </div>
      </nav>
      {renderPage()}
      <nav className="bottom-navbar">
        <ul>
          <li>
            <button onClick={() => setCurrentPage('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('about')}>Recepten</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('contact')}>Dagboek</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
