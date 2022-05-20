import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './auth/Auth'
import ForgettingPassword from './auth/ForgettingPassword'
import NavBar from './NavBar'

function Home({ user, setUser }) {
  const [showAuth, setShowAuth] = useState(false)
  const [isSignUp, setIsSignUp] = useState(null)
  const [isForgettingPassword, setIsForgettingPassword] = useState(false)
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
      {isForgettingPassword 
        ?
        <ForgettingPassword setShowAuth={setShowAuth} setIsForgettingPassword={setIsForgettingPassword} /> 
        :
        showAuth 
        ? 
        <Auth setShowAuth={setShowAuth} isSignUp={isSignUp} setUser={setUser} setIsSignUp={setIsSignUp} setIsForgettingPassword={setIsForgettingPassword} />
        :
        null}
    </div>    
  )
}

export default Home