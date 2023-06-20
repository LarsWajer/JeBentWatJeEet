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
          ingredienten: recipe.ingredienten.map(ingredient => ({
            naam: ingredient.ingredient,
            hoeveelheid: ingredient.hoeveelheid})),
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
            {isVisible && (
              <div className="extraContent">
                <div className='ingredienten'>
                <h3>Ingrediënten:</h3>
                <ul className='list'>
                  {recipe.ingredienten.map(ingredient => (
                    <li  key={uuidv4()}>
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