import Logout from './Logout';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Tv from '../Tv';
import Movie from '../Movies';
import Books from '../Books';

const BASE_URL = "https://api.themoviedb.org/3/tv/popular?api_key=126a79bca992104b92706fe8e4bf4f8d";

export default function Home() {
    const [content, setContent] = useState([]);
    const [movies, setMovies] = useState([]);
    const [books, setBooks] = useState([]);
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/trending")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setContent(data.results);
            })
    }, [])

    useEffect(() => {
        fetch("/trendingMovies")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setMovies(data.items);
            })
    }, [])

    useEffect(() => {
        fetch("/bestSellers")
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setBooks(data.results.books);
            })
    }, [])

    // function trending_data() {
    //     fetch('/trending', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(),
    //     }).then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setContent(data)
    //             console.log(data)
    //         }
    //     )
    // }
    // fetch("/trending").then(
    //     res => res.json()
    // ).then(
    //     data => {
    //         setContent(data)
    //         console.log(data)
    //     }
    // )


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
        }),
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
        <main style={{ padding: "1rem 0" }}>
            {/* // <main> */}
            <header
                style={{
                    color: '#7373E3',
                }}
            >
                <h1>PersonalPix</h1>
            </header>
            <nav id="navbar"
                style={{
                    color: '#7373E3',
                    border: "solid 10px",
                    padding: "10px",
                }}
            >
                <Link to="/home">Home</Link> |{" "}
                <Link to="/mylist">My List</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/contactForm">Contact Form</Link>
                <input type="text" placeholder="Search" onChange={handleChange}></input>
                <button type="button" onClick={() => sendQuery()}><IoIosSearch /></button>
            </nav>
            <div>
                <span className="pageTitle">Trending</span>
            </div>
            <Logout />
            <div>
                {movies.map((movieReq) =>
                    <Movie key={movieReq.id} {...movieReq} />)}
            </div>
            <div>
                {content.map((tvReq) =>
                    <Tv key={tvReq.id} {...tvReq} />)}
            </div>
            <div>
                {books.map((bookReq) =>
                    <Books key={bookReq.rank} {...bookReq} />)}
            </div>
        </main>
    );
}