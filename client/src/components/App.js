import React, { useState } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Profiling from './Profiling'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [user, setUser] = useState({})

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profiling' element={<Profiling user={user} />} />
      </Routes>
    </div>
  )
}

export default App