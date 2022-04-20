import React from 'react';
import './App.css';


const Movie = ({ title, image, year }) => {
    return (
        <div>
            {/* <h1>{title}</h1> */}
            <h1 className="titles">{title}</h1>
            <img className="movie_image" src={image}></img>
            <p>{year}</p>
        </div>
    )
}

export default Movie;