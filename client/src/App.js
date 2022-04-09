import React, { useState, useEffect } from 'react'

function App() {

  const [faves, setFaves] = React.useState([])
  const [fave, setFave] = React.useState(" ")
  const [faveEditing, setFaveEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState(" ")

  //load data
  React.useEffect(() => {
    const js = localStorage.getItem("faves")
    const loadFaves = JSON.parse(js)
    if (loadFaves) {
      setFaves(loadFaves)
    }
  }, [])

  //saving data into local storage
  React.useEffect(() => {
    const js = JSON.stringify(faves)
    localStorage.setItem("faves", js)
  }, [faves])

  function handleSubmit(e) {

    // to prevent refresh when input is entered into text box
    e.preventDefault()

    // creating new object 
    const newFave = {

      // create unique time ids for each object
      id: new Date().getTime(),
      text: fave,
    }

    // to add new objects into the array
    setFaves([...faves].concat(newFave))
    setFave(" ")
  }

  //return only the values where the favorite object id is NOT equal to the id. 
  function deleteFave(id) {
    const updatedFaves = [...faves].filter((fave) => fave.id !== id)

    setFaves(updatedFaves)
  }

  function toggleComplete(id) {
    //if this is the favorite item updated, then take the completed value and set to the opposite 
    const updatedFaves = [...faves].map((fave) => {
      if (fave.id === id) {
        fave.completed = !fave.completed
      }
      return fave
    })

    setFaves(updatedFaves)
  }

  //should return every favorite item once the selected item is edited first
  function editFave(id) {
    const updatedFaves = [...faves].map((fave) => {
      if (fave.id === id) {
        fave.text = editingText
      }
      return fave
    })
    setFaves(updatedFaves)
    setFaveEditing(null)
    setEditingText(" ")
  }

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
      <div className='App'>
        <h1>Your Favorites List</h1>
        <form onSubmit={handleSubmit}>
          <p>Add Your Favorite Books, TV shows and Movies</p>

          <input
            type="text"
            placeholder="Enter title of books, etc..."
            onChange={(e) => setFave(e.target.value)}
            value={fave} />
          <button type="submit">ADD</button>
        </form>
        {faves.map((fave) => <div key={fave.id}>
          {faveEditing === fave.id ? (<input
            type="text"
            onChange={(e) => setEditingText(e.target.value)}
            value={editingText} />) : (<div>{fave.text}</div>)}

          <button onClick={() => deleteFave(fave.id)}>DELETE</button>

          <input
            type="checkbox"
            onChange={() => toggleComplete(fave.id)}
            checked={fave.completed} />

          {faveEditing === fave.id ? (<button onClick={() => editFave(fave.id)}>SUBMIT</button>
          ) : (<button onClick={() => setFaveEditing(fave.id)}>EDIT</button>
          )}
        </div>)}
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
