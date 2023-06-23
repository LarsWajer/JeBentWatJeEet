import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Recepten = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [planner, setPlanner] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/recepten')
      .then(response => response.json())
      .then(data => {
        const fetchedRecipes = data.map(recipe => ({
          name: recipe.name,
          category: recipe.categorie,
          ingredienten: recipe.ingredienten.map(ingredient => ({
            naam: ingredient.ingredient,
            hoeveelheid: ingredient.hoeveelheid,
          })),
          bereidingswijze: recipe.bereidingswijze,
          key: uuidv4(),
          isVisible: false,
        }));
        setRecipes(fetchedRecipes);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    // Initialize the planner state with an empty selection for each day
    setPlanner(
      Array(7).fill({
        ochtend: null,
        middag: null,
        avond: null,
      })
    );
  }, []);

  const handleButtonClick = (key, dayIndex, partOfDay) => {
    const updatedPlanner = [...planner];
    const recipe = recipes.find(recipe => recipe.key === key);
    updatedPlanner[dayIndex][partOfDay] = recipe;
    setPlanner(updatedPlanner);
  };

  const handleRemoveRecipe = (dayIndex, partOfDay) => {
    const updatedPlanner = [...planner];
    updatedPlanner[dayIndex][partOfDay] = null;
    setPlanner(updatedPlanner);
  };

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <input
        className="searchBar"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Zoek naar recepten..."
      />
      {filteredRecipes.map(recipe => (
        <div className="dashboard" key={recipe.key}>
          <div className="widget">
            <div className="nameContainer">
              <h1 className="recipeName">{recipe.name}</h1>
            </div>
            <div className="line"></div>
            <div className="categoryContainer">
              <h2 className="recipeCategory">Categorie: {recipe.category}</h2>
            </div>
            {recipe.isVisible && (
              <div className="extraContent">
                <div className="ingredienten">
                  <h3>Ingrediënten:</h3>
                  <ul className="list">
                    {recipe.ingredienten.map(ingredient => (
                      <li key={uuidv4()}>
                        {ingredient.naam} - {ingredient.hoeveelheid}
                      </li>
                    ))}
                  </ul>
                </div>
                <h3>Bereidingswijze:</h3>
                <p>{recipe.bereidingswijze}</p>
              </div>
            )}

            <div className="buttonHolder">
              <button
                onClick={() => handleButtonClick(recipe.key, 0, 'ochtend')}
                className="displayButton"
              >
                Voeg aan de ochtend
              </button>
              <button
                onClick={() => handleButtonClick(recipe.key, 0, 'middag')}
                className="displayButton"
              >
                Voeg aan de Middag
              </button>
              <button
                onClick={() => handleButtonClick(recipe.key, 0, 'avond')}
                className="displayButton"
              >
                Voeg aan de avond
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recepten;
