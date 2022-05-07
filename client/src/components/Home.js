import React, { useState } from 'react'
import NavBar from './NavBar'

function Home() {
  const [user, setUser] = useState({})

  function handleClick() {
    console.log('clicked')
  }


  return (
    <div className="home">
      <NavBar />
      <h1>Swipe Right®</h1>
      <button className="primary-button" onClick={handleClick}>
        {user.di ? 'Logout' : "Create account"}
      </button>

    </div>
  )
}

export default Home