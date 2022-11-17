import React, { useState, useEffect } from 'react';
import RecipeAdder from './RecipeAdder';
import Recipe from './Recipe';

const RecipeContainer = () => {
  // set state
  const [recipeList, setRecipeList] = useState([]);
  // right now only gets all recipes in database.
  //TODO: allow search parameters, default to last 10
  const getRecipes = () => {
    fetch('/api/get-recipes')
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch data', data);
        const newRecipeList = [...recipeList, ...data];
        if (data.length > 0) setRecipeList(newRecipeList);
      })
      .catch((error) => {
        console.log(`Error getting recipes: ${error}`);
      });
  };

  /*
  equivalent to componentDidMount - final argument (no recipes to show...) is
  the only condition on which it will fire
  */
  useEffect(() => {
    getRecipes();
  }, []);

  /*
  Loop through state recipeList, adding a RecipeViewer component with those attributes
  to a recipesToRender array
  */
  const recipesToRender = [];
  if (recipeList.length > 0) {
    for (let i = 0; i < recipeList.length; i++) {
      const recipe = recipeList[i];
      const { name, stars, ingredients, source, timeRequired, dateCreated } =
        recipe;
      recipesToRender.push(
        <Recipe
          key={i}
          index={i}
          name={name}
          stars={stars}
          ingredients={ingredients}
          source={source}
          timeRequired={timeRequired}
          dateCreated={dateCreated}
        />
      );
    }
  } else {
    recipesToRender.push(<p>No recipes to show, try adding some!</p>);
  }
  return (
    <section>
      <div className='recipe-adder'>
        <RecipeAdder setRecipeList={setRecipeList} recipeList={recipeList} />
      </div>
      <div className='recipe-viewer'>{recipesToRender}</div>
    </section>
  );
};

export default RecipeContainer;
