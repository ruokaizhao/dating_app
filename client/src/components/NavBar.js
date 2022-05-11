import React from 'react'
import { useNavigate } from 'react-router-dom'
import colorLogo from '../images/color_logo.png'
import whiteLogo from '../images/white_logo.png'

function NavBar({ user, color, showAuth, setShowAuth, setIsSignUp }) {
  const navigate = useNavigate()

  function handleClick() {
    setIsSignUp(false)
    setShowAuth(true)
  }
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={color ? colorLogo : whiteLogo} onClick={() => navigate('/')} />
      </div>
      {user.id ?
        <button className="nav-button" disabled={showAuth} onClick={handleClick}>
          Logout
        </button> :
        <button className="nav-button" disabled={showAuth} onClick={handleClick}>
          Login
        </button> }
    </nav>
  )
}

export default NavBar