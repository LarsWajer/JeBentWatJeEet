import React from 'react';

const Home = () => {
  return (
    <div className='container'>
    <div className="landing-page">
      <header className="header">
        <h1>Welkom !</h1>
        <p>Dit is de hoofdpagina van Je Bent Wat Je Eet App</p>
      </header>

      <section className="features">
        <div className="feature">
          <img src="feature-1.png" alt="Feature 1" />
          <h2>Feature 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="cta-button">Sign Up</button>

        </div>

        <div className="feature">
          <img src="feature-2.png" alt="Feature 2" />
          <h2>Feature 2</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <button className="cta-button">Sign Up</button>
        </div>
      </section>

    </div>
    </div>
  );
};

export default Home;
