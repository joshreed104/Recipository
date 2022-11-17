import React from 'react';
import RecipeContainer from './RecipeContainer';

const App = () => {
  return (
    <main>
      <header>
        <h1 id='main-title'>Recipository</h1>
      </header>
      <nav>
        <ul>
          <li>Add Recipe</li>
          <li>View Recipes</li>
        </ul>
      </nav>
      <RecipeContainer />
      <footer>
        <p>Copyright nothing do whatever you want</p>
      </footer>
    </main>
  );
};

export default App;
