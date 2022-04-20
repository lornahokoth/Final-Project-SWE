import React from 'react';
import './App.css';


const SearchResults = ({ title, image, description }) => {
    return (
        <div>
            <h1 className="titles">{title}</h1>
            <img className="movie_image" src={image}></img>
            <p>{description}</p>
        </div>
    )
}

export default SearchResults;