import React from 'react';
import './App.css';


const Books = ({ title, book_image, description, author }) => {
    return (
        <div>
            <h1 className="titles">{title}</h1>
            <img src={book_image}></img>
            <p>Description: {description}</p>
            <p>Author(s): {author}</p>
        </div>
    )
}

export default Books;