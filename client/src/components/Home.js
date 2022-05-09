import React, { useState } from 'react'
import NavBar from './NavBar'

function Home() {
  const [user, setUser] = useState({})

  function handleClick() {
    console.log('clicked')
  }


  return (
    <div className="background">
      <NavBar user={user} />
      <div className="home">      
        <h1>Swipe Right®</h1>
        <button className="primary-button" onClick={handleClick}>
          {user.id ? 'Logout' : "Create account"}
        </button>
      </div>
    </div>    
  )
}

export default Home