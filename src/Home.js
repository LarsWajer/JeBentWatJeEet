import React, { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentDayOfWeek = currentDate.toLocaleDateString([], { weekday: 'long' });

      setTime(currentTime);
      setDayOfWeek(currentDayOfWeek);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container">
      <div className="dashboard">
        <div className="widget">
          <h2><span className="day">{dayOfWeek}</span></h2>
          <div className="clock">
            <span className="time">{time}</span>
          </div>
        </div>
        <div className="widget">
          <h2>Planning</h2>
          <p>De gekozen planning voor vandaag:</p>
          
        </div>
        <div className="widget">
          <h2>Dagboek</h2>
          <p>Widget 3 content</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
