import React from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Profiling from './Onboarding'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profiling' element={<Profiling />} />
      </Routes>
    </div>
  )
}

export default App