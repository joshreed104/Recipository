import React from 'react';

const RecipeAdder = () => {
  return (
    <div>
      <h1>Recipe Adder</h1>
      <input id='dish' placeholder='Name of dish'></input>
      <input id='ingredients' placeholder='Ingredients'></input>
      <label for='stars'>How many stars?</label>
      <select name='stars' id='stars'>
        <option value='*****'></option>
        <option value='****'></option>
        <option value='***'></option>
        <option value='**'></option>
        <option value='*'></option>
      </select>
    </div>
  );
};

export default RecipeAdder;
