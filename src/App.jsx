// REACT STUFF
import React from "react";
import { BrowserRouter, Route, Routes , Link} from 'react-router-dom'
import { useState } from 'react'

// ROUTING
import Login from './login.jsx'
import Signup from './sign_up.jsx'
import Statistics from './stats.jsx'
import Workout from './workout.jsx'
import Settings from './settings.jsx'
import Workout_input from './workout_input.jsx'

// PAGE SPECIFIC
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login count={count} setCount={setCount}/>} />
          <Route path="/log-in" element={<Login count={count} setCount={setCount}/>} />
          <Route path="/sign-up" />
          <Route path="/statistics" />
          <Route path="/workout" />
          <Route path="/settings" />
          <Route path="/workout-input" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
