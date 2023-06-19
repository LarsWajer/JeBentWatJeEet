import React, { useState, useEffect } from 'react';

const Home = () => {
  const [time, setTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentDayOfWeek = currentDate.toLocaleDateString([], { weekday: 'long' });

      setTime(currentTime);
      setDayOfWeek(currentDayOfWeek);
    }, 1000);

    // Retrieve the last visited date from localStorage
    const lastVisited = localStorage.getItem('lastVisited');

    // Check if lastVisited exists and is not older than 1 day
    if (lastVisited && isWithinOneDay(lastVisited)) {
      // Increment the streak if the last visit was within 1 day
      setStreak(prevStreak => prevStreak + 1);
    } else {
      // Reset the streak if the last visit was more than 1 day ago
      setStreak(1);
    }

    // Update the lastVisited date in localStorage
    localStorage.setItem('lastVisited', new Date().toISOString());

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Retrieve the streak from localStorage on component mount
  useEffect(() => {
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    }
  }, []);

  // Function to check if the provided date is within 1 day from the current date
  const isWithinOneDay = (dateString) => {
    const currentDate = new Date();
    const lastVisitedDate = new Date(dateString);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - lastVisitedDate.getTime();

    // Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference < 1;
  };

  return (
    <div className="container">
      <div className="dashboard">
        
        <div className="widget">
          <h2>
            <span className="day">{dayOfWeek}</span>
          </h2>
          <div className="clock">
            <span className="time">{time}</span>
          </div>
          <p>Streak: {streak}</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
