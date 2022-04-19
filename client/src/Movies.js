import React from 'react';


const Movie = ({ title, image, year }) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={image}></img>
            <p>{year}</p>
        </div>
    )
}

export default Movie;