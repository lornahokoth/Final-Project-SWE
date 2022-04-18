import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Login from './components/Login';

function App() {

    const [data, setData] = useState({})


    useEffect(() => {
        fetch("/endpoint").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])
    const [search, setSearch] = useState("");

    function handleChange(e) {
        setSearch(e.target.value)
        console.log(search)
    }

    function sendQuery() {
        console.log(search)
        var postData = { query: search }
        Promise.all([fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }),
        fetch('/search1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }),
        fetch('/search2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        ]).then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response.json()
            }));
        }).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }


    return (
        <div>
            <div>
                <Login />
            </div>
            {(typeof data.names === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                data.names.map((nam, i) => (
                    <p key={i}>{nam}</p>
                ))
            )}
        </div>
    )
}

export default App