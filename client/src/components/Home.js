import React, { useState } from 'react'
import Auth from './Auth'
import NavBar from './NavBar'

function Home() {
  const [user, setUser] = useState({})
  const [showAuth, setShowAuth] = useState(false)

  function handleClick() {
    setShowAuth(true)
  }

  return (
    <div className="background">
      <NavBar user={user} showAuth={showAuth} setShowAuth={setShowAuth} />
      <div className="home">      
        <h1>Swipe Right®</h1>
        <button className="primary-button" onClick={() => setShowAuth(true)}>
          {user.id ? 'Logout' : "Create account"}
        </button>
        {showAuth && <Auth setShowAuth={setShowAuth} />}
      </div>
    </div>    
  )
}

export default Home