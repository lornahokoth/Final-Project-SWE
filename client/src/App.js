import React, { useState, useEffect } from 'react'

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