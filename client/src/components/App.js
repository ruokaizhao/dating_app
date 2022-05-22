import React, { useEffect, useState } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Onboarding from './Onboarding'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './auth/ResetPassword'
import UserProfile from './UserProfile'

function App({ cable }) {
  const [user, setUser] = useState({})
  const [showAuth, setShowAuth] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  useEffect(() => {
    fetch('/api/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data))
      }
    })
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home user={user} setUser={setUser} showAuth={showAuth} setShowAuth={setShowAuth} />} />
        <Route path='/dashboard' element={<Dashboard user={user} cable={cable} />} />
        <Route path='/onboarding' element={<Onboarding user={user} setUser={setUser} showAuth={showAuth} isEditingProfile={isEditingProfile} />} />
        <Route path='/reset_password/:token' element={<ResetPassword setUser={setUser} />} />
        <Route path='/user-profile' element={<UserProfile user={user} setIsEditingProfile={setIsEditingProfile} showAuth={showAuth} setShowAuth={setShowAuth} setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App