import React from 'react'

export default function ResultCard ({movies, updateName}) {

    function onClick(event) {
        var input = event.target.innerText;
        updateName(input);
    }

    return (
        <ul>
            {movies.map((movie) => {
                return (
                    <li key={movie.id} onClick={onClick}>
                        {movie.title} - ({movie.id})
                    </li>
                )
            })}
        </ul>
    )
}
