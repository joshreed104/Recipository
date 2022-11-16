import React from 'react';

const RecipeAdder = (props) => {
  const handleClick = async () => {
    //get all inputs from fields
    const name = document.getElementById('dish').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    //get star choice
    const dropdownArray = document.getElementById('stars');
    const stars = dropdownArray.options[dropdownArray.selectedIndex].value;
    const source = [
      document.getElementById('source').value,
      document.getElementById('sourceUrl').value,
    ];
    const timeRequired = document.getElementById('timeRequired').value;
    const tried = document.getElementById('tried').value;

    // add new entry to database
    try {
      const response = await fetch('/api/add-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          stars,
          ingredients,
          source,
          timeRequired,
          tried,
        }),
      });
      // FIX THIS
      const newRecipe = await response.json();
      console.log(newRecipe);
      const newRecipeList = [newRecipe, ...props.recipeList];
      props.setRecipeList(newRecipeList);
    } catch (error) {
      console.log('Error posting new recipe ', error);
    }
  };

  return (
    <section>
      <h1>Recipe Adder</h1>
      <input id='dish' placeholder='Name of dish'></input>
      <input id='ingredients' placeholder='Ingredients'></input>
      <input id='source' placeholder='Recipe source'></input>
      <input id='sourceUrl' placeholder='Link to recipe'></input>
      <input id='timeRequired' placeholder='Time required (minutes)'></input>

      <label htmlFor='tried'>Have you already tried this recipe?</label>
      <select name='tried' id='tried'>
        <option value='true'>Yes I've tried it!</option>
        <option value='false'>Nope, saving for later</option>
      </select>

      <label htmlFor='stars'>How'd you like it?</label>
      <select name='stars' id='stars'>
        <option value='5'>*****</option>
        <option value='4'>****</option>
        <option value='3'>***</option>
        <option value='2'>**</option>
        <option value='1'>*</option>
      </select>
      <button onClick={handleClick}>Add Recipe</button>
    </section>
  );
};

export default RecipeAdder;
