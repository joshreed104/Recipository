import React from 'react';

const Recipe = (props) => {
  const starsArray = [];
  let grayStars = 5 - props.stars;
  for (let i = 0; i < props.stars; i++) {
    starsArray.push(<span class='fa fa-star checked'></span>);
  }
  for (let i = 0; i < grayStars; i++) {
    starsArray.push(<span class='fa fa-star'></span>);
  }
  return (
    <ul className='recipe-box'>
      <li>
        {props.name} {starsArray}
      </li>
      <li>Ingredients: {props.ingredients}</li>
      <li>Time required: {props.timeRequired} minutes</li>
      <li>
        Source: {props.source[0]}{' '}
        <a href={props.source[1]}>{props.source[1]}</a>
      </li>
      <li>Date Added: {props.dateCreated.toDateString}</li>
    </ul>
  );
};

export default Recipe;
