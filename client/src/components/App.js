import React, { useEffect, useState } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Profiling from './auth/Onboarding'
import { Route, Routes } from 'react-router-dom'

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
        <Route path='/profiling' element={<Profiling user={user} />} />
      </Routes>
    </div>
  )
}

export default App