// REACT STUFF
import React from "react";
import {Link} from 'react-router-dom'

// PAGE SPECIFIC
import './App.css'

//COMPONENTS
import Main_nav_bar from './main-nav-bar.jsx'

const Workout = () => {
  return (
    <>
      <h1>WORKOUT</h1>
      <h2><Link to = "/workout-input-ai">Create workout plan with AI</Link></h2>
      <h2><Link to = "/workout-input">Create new workout plan</Link></h2>
      <h2><Link to = "/workouts-current">My workouts</Link></h2>
      <Main_nav_bar/>
    </>
  );
};

export default Workout