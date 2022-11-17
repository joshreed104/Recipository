import React, { useState, useEffect } from 'react';
import RecipeAdder from './RecipeAdder';
import Recipe from './Recipe';

const RecipeContainer = () => {
  // set state
  const [recipeList, setRecipeList] = useState([]);
  // right now only gets all recipes in database.
  //TODO: allow search parameters, default to last 10
  const getRecipes = (stars) => {
    fetch('/api/get-recipes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        filterstars: stars,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch data', data);
        if (stars === undefined) {
          const newRecipeList = [...recipeList, ...data];
          if (data.length > 0) setRecipeList(newRecipeList);
        } else if (stars === 'all') {
          setRecipeList([...data]);
        } else {
          if (data.length > 0) {
            const newRecipeList = [...data];
            if (newRecipeList.length > 0) setRecipeList(newRecipeList);
          } else {
            setRecipeList([]);
          }
          console.log(newRecipeList);
        }
      })
      .catch((error) => {
        console.log(`Error getting recipes: ${error}`);
      });
  };

  const filterStars = () => {
    const dropdownArray = document.getElementById('star-filter');
    const stars = dropdownArray.options[dropdownArray.selectedIndex].value;
    console.log(stars);
    return getRecipes(stars);
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
      <div className='filter-box'>
        <label>Filter Results: </label>
        <select id='star-filter' placeholder='Stars' onChange={filterStars}>
          <option value='all'>All</option>
          <option value='5'>Five Stars Only</option>
          <option value='4'>Four Stars Only</option>
          <option value='3'>Three Stars Only</option>
          <option value='2'>Two Stars Only</option>
          <option value='1'>One Star Only</option>
        </select>
        <label>Or: </label>
        <button>Show only untried recipes</button>
      </div>
      <div className='recipe-viewer'>{recipesToRender}</div>
    </section>
  );
};

export default RecipeContainer;
