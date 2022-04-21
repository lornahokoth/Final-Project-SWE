import React, { useState, useEffect } from 'react'
import ListContent from './ListContent'
import ResultCard from './ResultCard'

export default function List({ onAddItem, onDeleteList, onDeleteItem, listId, listName, listType, listContent }) {

    
    const [newItemName, setNewItemName] = useState('');
    const [newItemRating, setNewItemRating] = useState('');
    const [newMediaId, setNewMediaId] = useState('');
    const [results, setResults] = useState([]);

    function deleteListHandle() {
        onDeleteList(listId);
    }

    function updateNameHandle(event) {
        var query = event.target.value;
        setNewItemName(query);
        if(query.length > 3) {
            var postData = {query: event.target.value};
            if(listType == "Movie") {
                fetch('/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                }
                ).then(
                    (res) => res.json()
                ).then(
                    (data) => {
                        if(!data.errors) {
                            setResults([...data.results]);
                        } else {
                            setResults([]);
                        }
                    }
                )
            } else if (listType == "TV") {
                fetch('/search1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                }
                ).then(
                    (res) => res.json()
                ).then(
                    (data) => {
                        console.log(data)
                    }
                )
            } else if (listType == "Book") {
                fetch('/search2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                }
                ).then(
                    (res) => res.json()
                ).then(
                    (data) => {
                        console.log(data)
                    }
                )
            }
        }
    } 

    function updateName(input) {
        var inputArr = input.split(" - ");
        var name = inputArr[0];
        var media_id = inputArr[1];
        setNewItemName(name);
        setNewMediaId(media_id);
        setResults([]);
    }

    function updateRatingHandle(event) {
        setNewItemRating(event.target.value);
    }

    function addItemHandle() {
        if(newItemName == '' || newItemRating == '') {
            return;
        }
        onAddItem(listId, newItemName, newItemRating, newMediaId);
        setNewItemName('');
        setNewItemRating('');
    }

    function deleteItemHandle(itemId) {
        onDeleteItem(listId, itemId);
    }

    return (
        <div>
            <p>{listName} - {listType}</p>
            <button onClick={deleteListHandle}>Delete List</button>
            <ul>
                {listContent.map((content) => (
                    <ListContent key={content.id}
                                 onDeleteItem={deleteItemHandle}
                                 itemId={content.id}
                                 name={content.name}
                                 rating={content.rating}
                    />
                ))}
            </ul>
            <input name="itemName" id="itemName" type="text" value={newItemName} placeholder="Name" onChange={updateNameHandle}></input>
            {results.length > 0 && (
                <ResultCard movies={results} updateName={updateName}/>
            )}
            <input name="itemRating" id="itemRating" type="number" value={newItemRating} placeholder="Rating" onChange={updateRatingHandle}></input>
            <button onClick={addItemHandle}>Add To List</button>
            <hr></hr>
        </div>
    );
}