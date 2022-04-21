import React from 'react';
import './App.css';


const Movie = ({ title, image, year }) => {
    return (
        <div className="movie">
            {/* <h1>{title}</h1> */}
            <img className="movie_image" src={image}></img>
            <b>{title}</b>
            <p>{year}</p>
        </div>
    )
}

export default Movie;