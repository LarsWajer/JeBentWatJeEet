// Dagboek.js
import React, { useState, useEffect } from 'react';

const Dagboek = () => {
  const daysOfWeek = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const currentDayIndex = new Date().getDay(); // Get the index of the current day (0 - Sunday, 1 - Monday, etc.)
  const currentTime = new Date().getHours(); // Get the current hour of the day (0 - 23)

  const [planner, setPlanner] = useState([]);

  useEffect(() => {
    // Retrieve the planner from localStorage on component mount
    const storedPlanner = localStorage.getItem('planner');
    if (storedPlanner) {
      setPlanner(JSON.parse(storedPlanner));
    }
  }, []);

  const updatePlanner = updatedPlanner => {
    setPlanner(updatedPlanner);
    // Update the planner in localStorage
    localStorage.setItem('planner', JSON.stringify(updatedPlanner));
  };

  const handleRecipeRemoveFromPlanner = (partOfDay, dayIndex) => {
    const updatedPlanner = planner.map((day, index) => {
      if (index === dayIndex) {
        return {
          ...day,
          [partOfDay]: null,
        };
      }
      return day;
    });
    updatePlanner(updatedPlanner);
  };

  const handleRecipeAddToPlanner = (recipe, partOfDay, dayIndex) => {
    const updatedPlanner = planner.map((day, index) => {
      if (index === dayIndex) {
        return {
          ...day,
          [partOfDay]: recipe,
        };
      }
      return day;
    });
    updatePlanner(updatedPlanner);
  };

  const getDayClassName = dayIndex => {
    if (dayIndex === currentDayIndex) {
      return 'highlighted';
    }
    return '';
  };

  const getSectionClassName = section => {
    if (
      (section === 'ochtend' && currentTime >= 6 && currentTime < 12) ||
      (section === 'middag' && currentTime >= 12 && currentTime < 18) ||
      (section === 'avond' && (currentTime >= 18 || currentTime < 6))
    ) {
      return 'highlighted';
    }
    return '';
  };

  return (
    <div className="container">
      <table className="week-table">
        <thead>
          <tr>
            <th></th>
            <th>ochtend</th>
            <th>middag</th>
            <th>avond</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, index) => (
            <tr key={index}>
              <th className={getDayClassName(index)}>{day}</th>
              <td className={index === currentDayIndex ? getSectionClassName('ochtend') : ''}>
                {planner[index]?.ochtend && (
                  <div>
                    {planner[index].ochtend.name}
                    <button
                      onClick={() => handleRecipeRemoveFromPlanner('ochtend', index)}
                      className="removeButton"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </td>
              <td className={index === currentDayIndex ? getSectionClassName('middag') : ''}>
                {planner[index]?.middag && (
                  <div>
                    {planner[index].middag.name}
                    <button
                      onClick={() => handleRecipeRemoveFromPlanner('middag', index)}
                      className="removeButton"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </td>
              <td className={index === currentDayIndex ? getSectionClassName('avond') : ''}>
                {planner[index]?.avond && (
                  <div>
                    {planner[index].avond.name}
                    <button
                      onClick={() => handleRecipeRemoveFromPlanner('avond', index)}
                      className="removeButton"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dagboek;
