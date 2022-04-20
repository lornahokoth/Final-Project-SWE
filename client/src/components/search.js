import React, { useState, useEffect } from 'react';
// import Searchbar from '../SearchBar';
import { Link } from "react-router-dom";
import { IoIosSearch, IoMdReturnRight } from 'react-icons/io';
import SearchResults from '../SearchResults';
import SearchTv from '../SearchTv';
// import SearchBooks from '../SearchBooks';
import './components.css'


export default function Search() {
    const [data, setData] = useState([]);
    const [tv, setTv] = useState([]);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    function handleChange(e) {
        setSearch(e.target.value)
        console.log(search)
    }

    function sendQuery() {
        console.log(search)
        var postData = { query: search }
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res => res.json()
        ).then(
            data => {
                setData(data.results)
                console.log(data)
            }
        )
        fetch('/search1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res1 => res1.json()
        ).then(
            data1 => {
                setTv(data1.results)
                console.log(data1)
            }
        )
        fetch('/search2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then(
            res1 => res1.json()
        ).then(
            data2 => {
                setBooks(data2.items)
                console.log(data2.items)
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
    //     }),
    //     ]).then(function (responses) {
    //         return Promise.all(responses.map(function (response) {
    //             return response.json()
    //         }));
    //     }).then(
    //         data => {
    //             setData(data)
    //             console.log(data)
    //         }
    //     )
    // }
    // const [data, setData] = useState({})
    // useEffect(() => {
    //     fetch("http://localhost:3000/endpoint").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData(data)
    //             console.log(data)
    //         }
    //     )
    // }, [])

    return (
        <main className="main" style={{ padding: "1rem 0" }}>
            <header
                style={{
                    color: '#6765c7',
                }}
            >
                <h1>PersonalPix</h1>
            </header>
            <nav id="navbar"
                style={{
                    color: '#6765c7',
                    border: "solid 10px",
                    padding: "10px",
                }}
            >
                <Link className="Home" to="/home">Home</Link> |{" "}
                <Link className="MyList" to="/mylist">My Lists</Link> |{" "}
                <Link className="Profile" to="/profile">Profile</Link> |{" "}
                {/* <form className="search"> */}
                <Link to="/contactForm">Contact Form</Link > | {" "}
                <input type="text" placeholder="Search" onChange={handleChange}></input>
                <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>
                {/* </form> */}

            </nav>
            <div>
                {data.map((searchRes) =>
                    <SearchResults key={searchRes.id} {...searchRes} />)}
            </div>
            <div>
                {tv.map((searchTv) =>
                    <SearchTv key={searchTv.id} {...searchTv} />)}
            </div>
            <div>
                {books.map(searchBooks => (
                    <div>
                        <h1 className="titles">{searchBooks.volumeInfo.title}</h1>
                        <p>{searchBooks.volumeInfo.subtitle}</p>
                        <img src={searchBooks.volumeInfo.imageLinks.thumbnail} alt={searchBooks.title} />
                        <p>{searchBooks.volumeInfo.description}</p>
                    </div>
                ))}
            </div>
        </main >
    );
}