import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const Home = () => {
  const { userData } = useContext(UserContext);
  const [streak, setStreak] = useState(0);
  const [showStreakCircle, setShowStreakCircle] = useState(false);

  useEffect(() => {
    // Fetch and update the streak from the user data or any other source
    // Here, we are using a random value as an example
    const randomStreak = Math.floor(Math.random() * 7) + 1;
    setStreak(randomStreak);
  }, []);

  useEffect(() => {
    if (userData) {
      setShowStreakCircle(true);
    }
  }, [userData]);

  const handleStreakPopup = () => {
    if (streak === 7) {
      alert('Congratulations! You have reached your goal for a healthy lifestyle!');
    } else {
      alert('Better next time, buddy!');
      setStreak(0);
    }
  };

  return (
    <div className='container'>
      <div className="landing-page">
        <div className="widget">
          <h1>Welkom! {userData && userData.name}</h1>

          <section className="features">
            <div className="feature">
              <h2>Feature 1</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="cta-button" onClick={handleStreakPopup}>Sign Up</button>
            </div>

            {showStreakCircle && (
              <div className="streak-circle">
                <p>Streak: {streak} days</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
