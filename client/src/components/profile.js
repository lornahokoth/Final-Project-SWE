import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Searchbar from '../SearchBar';

export default function Profile() {

    return (
        <main style={{ padding: "1rem 0" }}>
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
                <Link to="/home">Home</Link> |{" "}
                <Link to="/mylist">My Lists</Link> | {" "}
                <Link to="/profile"> Profile</Link > | {" "}
                <Link to="/contactForm"> Contact Form</Link >
                <Link to="/search">Search</Link>

            </nav >
        </main >
    );
}