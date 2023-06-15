import React from 'react';

function Dagboek() {
  const daysOfWeek = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const currentDayIndex = new Date().getDay(); // Get the index of the current day (0 - Sunday, 1 - Monday, etc.)
  const currentTime = new Date().getHours(); // Get the current hour of the day (0 - 23)

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
              <th className={getDayClassName(index)}>
                {day}
              </th>
              <td className={index === currentDayIndex ? getSectionClassName('Morning') : ''}>
                Morning content for {day}
              </td>
              <td className={index === currentDayIndex ? getSectionClassName('Afternoon') : ''}>
                Afternoon content for {day}
              </td>
              <td className={index === currentDayIndex ? getSectionClassName('Evening') : ''}>
                Evening content for {day}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dagboek;
