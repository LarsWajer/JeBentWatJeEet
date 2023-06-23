import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Recepten = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
          isExpanded: false,
        }));
        setRecipes(fetchedRecipes);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  const handleToggleExpand = (key) => {
    setRecipes(prevRecipes => {
      return prevRecipes.map(recipe => {
        if (recipe.key === key) {
          return {
            ...recipe,
            isExpanded: !recipe.isExpanded,
          };
        }
        return recipe;
      });
    });
  };

  const handleButtonClick = (recipeName, timeOfDay) => {
    // Handle the button click logic
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <input className="searchBar" type="text" placeholder="Search Recipe" value={searchTerm} onChange={handleSearch} />
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
            <div>
              <button onClick={() => handleButtonClick(recipe.name, 'morning')}>Morning</button>
              <button onClick={() => handleButtonClick(recipe.name, 'afternoon')}>Afternoon</button>
              <button onClick={() => handleButtonClick(recipe.name, 'evening')}>Evening</button>
            </div>
            <div className="extraContent">
              <button onClick={() => handleToggleExpand(recipe.key)}>
                {recipe.isExpanded ? 'Hide' : 'Expand'}
              </button>
              {recipe.isExpanded && <p>{recipe.bereidingswijze}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recepten;
