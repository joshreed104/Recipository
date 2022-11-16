import React from 'react';

const RecipeViewer = (props) => {
  return (
    <section>
      <p>Name:{props.name}</p>
      <p>Stars:{props.stars}</p>
    </section>
  );
};

export default RecipeViewer;
