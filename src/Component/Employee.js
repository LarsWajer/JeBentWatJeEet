import React from 'react';
import { useState } from 'react';

const Employee = () => {
  const items = ([] = useState([
    { name: 'Caleb', role: 'developer' },
    { name: 'Gabe', role: 'developer' },
    { name: 'Carol', role: 'developer' },
    { name: 'Darren', role: 'developer' },
    { name: 'Kyle', role: 'developer' },
  ]));

  return (
    <div>
      {items.map((employee) => {
        console.log(employee);
      })}
    </div>
  );
};

export default Employee;
