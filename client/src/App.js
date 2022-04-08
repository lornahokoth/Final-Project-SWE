import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch("http://localhost:3000/endpoint").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
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
        <Link to="/search">Search</Link> |{" "}
        <Link to="/mylist">My List</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>
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