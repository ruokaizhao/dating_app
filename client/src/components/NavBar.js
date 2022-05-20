import React from 'react'
import colorLogo from '../images/color_logo.png'
import whiteLogo from '../images/white_logo.png'

function NavBar({ user, color, showAuth, setShowAuth, setIsSignUp, setUser }) {

  function handleLoginClick() {
    setIsSignUp(false)
    setShowAuth(true)
  }

  function handleLogoutClick() {
    fetch('/api/logout', {
      method: 'DELETE'
    })
    .then(() => {
      setUser({})
    })
  }

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={color ? colorLogo : whiteLogo} />
      </div>
      {user.id ?
        <button className="nav-button" disabled={showAuth} onClick={handleLogoutClick}>
          Logout
        </button> :
        <button className="nav-button" disabled={showAuth} onClick={handleLoginClick}>
          Login
        </button> }
    </nav>
  )
}

export default NavBar