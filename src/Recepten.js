import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const recipes = [
  {
    name: 'Baked Beans',
    category: 'dinner',
    key: uuidv4(),
  },
  {
    name: 'spaghetti',
    category: 'dinner',
    key: uuidv4(),
  },
  // {
  //   name: 'cruesli',
  //   category: 'breakfast',
  //   key: uuidv4(),
  // },
  // {
  //   name: 'bread',
  //   category: 'lunch',
  //   key: uuidv4(),
  // },
];
function Recepten() {
  return (
    <div class="container">
      {recipes.map((recipe) => (
        <div className="dashboard">
          <div className="widget">
            <h1 className="recipeName"> {recipe.name}</h1>
            <h2 className="recipeCategory"> {recipe.category}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recepten;
