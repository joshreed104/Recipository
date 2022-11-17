import React from 'react';

const Recipe = (props) => {
  const starsArray = [];
  let grayStars = 5 - props.stars;
  for (let i = 0; i < props.stars; i++) {
    starsArray.push(<span class='fa fa-star checked'></span>);
  }
  for (let i = 0; i < grayStars; i++) {
    starsArray.push(<span className='fa fa-star'></span>);
  }
  return (
    <div className='recipe-box'>
      <ul>
        <li style={{ fontSize: 30, textEmphasis: true }}>
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
      <div className='recipe-buttons'>
        <button className='edit-button'>Edit Recipe</button>
        <button className='delete-button'>Delete</button>
      </div>
    </div>
  );
};

export default Recipe;
