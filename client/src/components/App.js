import React, { useEffect, useState } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Onboarding from './Onboarding'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './auth/ResetPassword'
import Account from './Account'

function App({ cable }) {
  const [user, setUser] = useState({})
  const [showAuth, setShowAuth] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showViewedUser, setShowViewedUser] = useState(false)

  useEffect(() => {
    fetch('/api/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data))
      }
    })
  }, [])

  // useEffect(() => {
  //   async function remainLoggedIn() {
  //     const response = await fetch('/api/me')
  //     if (response.ok) {
  //       const data = await response.json()
  //       setUser(data)
  //     }    
  //   }
  //   remainLoggedIn()    
  // }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <Home 
            user={user} 
            setUser={setUser} 
            showAuth={showAuth} 
            setShowAuth={setShowAuth} 
          />} 
        />
        <Route path='/dashboard' element={
          <Dashboard 
            user={user} 
            cable={cable} 
            setShowAuth={setShowAuth}
            showViewedUser={showViewedUser}
            setShowViewedUser={setShowViewedUser}
          />} 
        />
        <Route path='/onboarding' element={
          <Onboarding 
            user={user} 
            setUser={setUser} 
            showAuth={showAuth} 
            isEditingProfile={isEditingProfile} 
          />} 
        />
        <Route path='/reset_password/:token' element={
          <ResetPassword 
            setUser={setUser} 
          />} 
        />
        <Route path='/account' element={
          <Account 
            user={user} 
            showViewedUser={showViewedUser}
            setShowViewedUser={setShowViewedUser}
            setIsEditingProfile={setIsEditingProfile} 
            showAuth={showAuth} 
            setShowAuth={setShowAuth} 
            setUser={setUser} 
          />} 
        />
      </Routes>
    </div>
  )
}

export default App