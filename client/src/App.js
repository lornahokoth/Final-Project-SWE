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


    return (
        <div>
            <Login />
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