import Logout from './Logout';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Tv from '../Tv';
import Movie from '../Movies';
import Books from '../Books';
import Searchbar from '../SearchBar';
import './components.css';

export default function Home() {


    return (
        <main className="main" style={{ padding: "1rem 0" }}>
            {/* // <main> */}
            <header
                style={{
                    color: '#6765c7',
                }}
            >
                <div class="logout">
                    <Logout />
                </div>
                <h1>
                    PersonalPix
                </h1>
            </header>
            <nav id="navbar"
                style={{
                    color: '#6765c7',
                    border: "solid 10px",
                    padding: "10px",
                }}
            >
                <Link to="/home">Home</Link> |{" "}
                <Link to="/trending_page">Trending</Link> |{" "}
                <Link to="/mylist">My Lists</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/contactForm">Contact Form</Link> |{" "}
                <Link to="/search">Search</Link>
                {/* <Searchbar search={search} /> */}
            </nav >
        </main >
    );
}