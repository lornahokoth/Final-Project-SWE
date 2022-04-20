import React from 'react';
import './App.css';
const IMG_URL = "https://image.tmdb.org/t/p/w200/";

const SearchTv = ({ name, poster_path, overview }) => {
    return (
        <div>
            <h1 className="titles">{name}</h1>
            <img src={IMG_URL + poster_path}></img>
            <p>{overview}</p>
        </div>
    )
}

export default SearchTv;