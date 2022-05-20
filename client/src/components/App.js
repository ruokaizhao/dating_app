import React, { useEffect, useState } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Profiling from './auth/Onboarding'
import { Route, Routes } from 'react-router-dom'
import ResettingPassword from './auth/ResettingPassword'

function App({ cable }) {
  const [user, setUser] = useState({})

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
        <Route path='/' element={<Home user={user} setUser={setUser} />} />
        <Route path='/dashboard' element={<Dashboard user={user} cable={cable} />} />
        <Route path='/onboarding' element={<Profiling user={user} />} />
        <Route path='/reset_password/:token' element={<ResettingPassword setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App