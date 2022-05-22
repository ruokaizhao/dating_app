import React, { useState } from 'react'
import EmailPassword from './EmailPassword'
import NavBar from './NavBar'
import UserProfile from './UserProfile'

function Account({ user, showAuth, setShowAuth, setIsEditingProfile, setUser }) {
  const [showUserProfile, setShowUserProfile] = useState(true)


  return (
    <div className="account">
      <NavBar user={user} color={true} showAuth={showAuth} setUser={setUser} />
      <div className="account-body">
        <div className="account-button">
          <button autoFocus onClick={() => setShowUserProfile(true)}>Profile</button>
          <button onClick={() => setShowUserProfile(false)}>Security</button>
        </div>
        {showUserProfile 
        ?
        <UserProfile user={user} setShowAuth={setShowAuth} setIsEditingProfile={setIsEditingProfile} />
        :
        <EmailPassword user={user} />}        
      </div>
    </div>    
  )
}

export default Account