import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
const Recepten = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/recepten')
      .then(response => response.json())
      .then(data => {
        const fetchedRecipes = data.map(recipe => ({
          name: recipe.name,
          category: recipe.categorie,
          bereidingswijze: recipe.bereidingswijze,
          key: uuidv4(),
        }));
        setRecipes(fetchedRecipes);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container">
      {recipes.map(recipe => (
        <div className="dashboard" key={recipe.key}>
          <div className="widget">
            <div className="nameContainer">
              <h1 className="recipeName"> {recipe.name}</h1>
            </div>
            <div className="line"></div>
            <div className="categoryContainer">
              <h2 className="recipeCategory"> Categorie: {recipe.category}</h2>
            </div>
            {isVisible && <div className="extraContent">{recipe.bereidingswijze}</div>}
            <div className="buttonHolder">
              <button
                onClick={handleButtonClick}
                className="displayButton"
              ></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recepten;