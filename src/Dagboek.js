import React, { useState, useEffect } from 'react';

function Dagboek() {
  const daysOfWeek = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const currentDayIndex = new Date().getDay();
  const currentTime = new Date().getHours();
  const [markedCell, setMarkedCell] = useState(null);

  const morningRecipe = localStorage.getItem('morningRecipe') || '';
  const afternoonRecipe = localStorage.getItem('afternoonRecipe') || '';
  const eveningRecipe = localStorage.getItem('eveningRecipe') || '';

  const getDayClassName = (dayIndex) => {
    if (dayIndex === currentDayIndex) {
      return 'highlighted';
    }
    return '';
  };

  const getSectionClassName = (section) => {
    if (
      (section === 'ochtend' && currentTime >= 6 && currentTime < 12) ||
      (section === 'middag' && currentTime >= 12 && currentTime < 18) ||
      (section === 'avond' && (currentTime >= 18 || currentTime < 6))
    ) {
      return 'highlighted';
    }
    return '';
  };

  const handleMarkCell = (dayIndex, section, recipeName) => {
    const newMarkedCell = { day: dayIndex, section, name: recipeName };

    if (markedCell && markedCell.day === dayIndex && markedCell.section === section) {
      // Cell already marked, update the recipe name only if it's different
      if (markedCell.name !== recipeName) {
        setMarkedCell((prevMarkedCell) => ({
          ...prevMarkedCell,
          name: recipeName,
        }));
      }
    } else {
      // Cell not marked, mark the new cell
      setMarkedCell(newMarkedCell);
    }
  };

  const handleUnmarkCell = () => {
    setMarkedCell(null);
  };

  useEffect(() => {
    const storedMarkedCell = JSON.parse(localStorage.getItem('markedCell'));
    if (storedMarkedCell) {
      setMarkedCell(storedMarkedCell);
    }
  }, []);

  useEffect(() => {
    if (markedCell) {
      localStorage.setItem('markedCell', JSON.stringify(markedCell));
    } else {
      localStorage.removeItem('markedCell');
    }
  }, [markedCell]);

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
              <td
                className={`${index === currentDayIndex && markedCell?.day === index && markedCell?.section === 'ochtend' ? 'highlighted' : ''}`}
                onClick={() => {
                  if (markedCell?.day === index && markedCell?.section === 'ochtend') {
                    handleUnmarkCell();
                  } else {
                    handleMarkCell(index, 'ochtend', morningRecipe);
                  }
                }}
              >
                {index === currentDayIndex && markedCell?.day === index && markedCell?.section === 'ochtend' ? markedCell.name : morningRecipe}
              </td>
              <td
                className={`${index === currentDayIndex && markedCell?.day === index && markedCell?.section === 'middag' ? 'highlighted' : ''}`}
                onClick={() => {
                  if (markedCell?.day === index && markedCell?.section === 'middag') {
                    handleUnmarkCell();
                  } else {
                    handleMarkCell(index, 'middag', afternoonRecipe);
                  }
                }}
              >
                {index === currentDayIndex && markedCell?.day === index && markedCell?.section === 'middag' ? markedCell.name : afternoonRecipe}
              </td>
              <td
                className={`${index === currentDayIndex && markedCell?.day === index && markedCell?.section === 'avond' ? 'highlighted' : ''}`}
                onClick={() => {
                  if (markedCell?.day === index && markedCell?.section === 'avond') {
                    handleUnmarkCell();
                  } else {
                    handleMarkCell(index, 'avond', eveningRecipe);
                  }
                }}
              >
                {index === currentDayIndex && markedCell?.day === index && markedCell?.section === 'avond' ? markedCell.name : eveningRecipe}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dagboek;
