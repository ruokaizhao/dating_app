import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth'
import NavBar from './NavBar'

function Home({ user, setUser }) {
  const [showAuth, setShowAuth] = useState(false)
  const [isSignUp, setIsSignUp] = useState(null)
  const navigate = useNavigate()

  function handleClick() {
    setIsSignUp(true)
    setShowAuth(true)
  }

  return (
    <div className="background">
      <div className={showAuth ? "dim-layer" : ""}>
        <NavBar user={user} showAuth={showAuth} setShowAuth={setShowAuth} setIsSignUp={setIsSignUp} setUser={setUser} color={false} />
        <div className="home">      
          <h1 className="primary-title">Swipe Right®</h1>
          <button className="primary-button" onClick={user.id ? () => navigate('/dashboard') : handleClick}>
            {user.id ? `Welcome, ${user.first_name}` : 'Create account'}
          </button>        
        </div>
      </div>      
      {showAuth && <Auth setShowAuth={setShowAuth} isSignUp={isSignUp} user={user} setUser={setUser} />}
    </div>    
  )
}

export default Home