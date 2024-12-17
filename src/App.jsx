// REACT STUFF
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

// ROUTING
import Login from './login.jsx'
import Signup from './sign_up.jsx'

import Statistics from './stats.jsx'
import Workout from './workout.jsx'
import Settings from './settings.jsx'

import Workout_input from './workout_input.jsx'
import Workout_input_ai from './workout-input-ai.jsx'
import Workouts_current from './workouts-current.jsx'

import Edit_workout_plan from './edit-workout-plan.jsx'

// PAGE SPECIFIC
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/log-in" element={<Login/>} />

          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>

          <Route path="/statistics" element={<Statistics/>}/>
          <Route path="/workout" element={<Workout/>}/>
          <Route path="/settings" element={<Settings/>}/>
          
          <Route path="/workout-input" element={<Workout_input/>}/>
          <Route path="/workout-input-ai" element={<Workout_input_ai/>}/>
          <Route path="/workouts-current" element={<Workouts_current/>}/>
          
          <Route path="/edit-workout-plan/:id" element={<Edit_workout_plan/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
