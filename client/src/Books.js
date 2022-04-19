import React from 'react';


const Books = ({ title, book_image, description, author }) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={book_image}></img>
            <p>Description: {description}</p>
            <p>Author(s): {author}</p>
        </div>
    )
}

export default Books;