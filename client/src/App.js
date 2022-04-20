import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Login from './components/Login';
import './Login.css';
function App() {
    const [data, setData] = useState({})
    const [search, setSearch] = useState("");

    useEffect(() => {
        // fetch("/localhost:3000/endpoint").then(
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
                <Link to="/profile">Profile</Link>|{" "}
                <Link to="/contactForm">Contact Form</Link>

                <input type="text" placeholder="Search" onChange={handleChange}></input>
                <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>

            </nav>
            
            <div class="box">
                <h1>Personalpix</h1>
                
                <h2>Login with:</h2>
                <Login/>
            </div>

            {(typeof data.names === 'undefined') ? (
                <p></p>
            ) : (
                data.names.map((nam, i) => (
                    <p key={i}>{nam}</p>
                ))
            )}
        </div>
    )
}

export default App