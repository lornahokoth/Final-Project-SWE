import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

function App() {
    const [data, setData] = useState({})
    const [results, setResults] = useState({})
    const [search, setSearch] = useState("");

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

    function handleChange(e) {
        setSearch(e.target.value)
        console.log(search)
    }

    function sendQuery() {
        console.log(search)
        var postData = { query: search }
        fetch('/search1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                setResults(data)
                console.log(data)
            }
        )
    }
    // function sendQuery() {
    //     console.log(search)
    //     var postData = { query: search }
    //     Promise.all([fetch('/search', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(postData),
    //     }),
    //     fetch('/search1', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(postData),
    //     }),
    //     fetch('/search2', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(postData),
    //     })
    //     ]).then(function (responses) {
    //         return Promise.all(responses.map(function (response) {
    //             return response.json()
    //         }));
    //     }).then(
    //         data => {
    //             setResults(data)
    //             console.log(data)
    //         }
    //     )
    // }

    return (
        <div>
            <header
                style={{
                    color: '#9966ff',
                }}
            >
                <h1>PersonalPix</h1>
            </header>
            <nav id="navbar"
                style={{
                    color: '#9966ff',
                    border: "solid 10px",
                    padding: "10px",
                }}
            >
                <Link to="/home">Home</Link> |{" "}
                <Link to="/mylist">My List</Link> |{" "}
                <Link to="/profile">Profile</Link>
                <input type="text" placeholder="Search" onChange={handleChange}></input>
                <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>

            </nav>
            {(typeof data.names === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                data.names.map((nam, i) => (
                    <p key={i}>{nam}</p>
                ))
            )}
            {results.results.map((show, i) =>
                <p key={i}>{show}</p>
            )}
        </div>
    )
}

export default App