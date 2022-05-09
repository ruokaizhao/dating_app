import React, { useState } from 'react'
import Auth from './Auth'
import NavBar from './NavBar'

function Home() {
  const [user, setUser] = useState({})
  const [showAuth, setShowAuth] = useState(false)
  const [isSignUp, setIsSignUp] = useState(null)

  function handleClick() {
    setIsSignUp(true)
    setShowAuth(true)
  }

  return (
    <div className="background">
      <div className={showAuth ? "dim-layer" : ""}>
        <NavBar user={user} showAuth={showAuth} setShowAuth={setShowAuth} setIsSignUp={setIsSignUp} />
        <div className="home">      
          <h1 className="primary-title">Swipe Right®</h1>
          <button className="primary-button" onClick={handleClick}>
            {user.id ? 'Logout' : "Create account"}
          </button>        
        </div>
      </div>      
      {showAuth && <Auth setShowAuth={setShowAuth} isSignUp={isSignUp} />}
    </div>    
  )
}

export default Home