// REACT STUFF
import axios from "axios";
import React, { useEffect, useState} from "react";
import {Link} from 'react-router-dom'

// PAGE SPECIFIC
import './App.css'
import Workout_plan_card from '../components/workout-plan-card.jsx'

const WorkoutInput = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // GET CURRENCT COOKIES TO JSON THEN GET TOKEN
  
    const cookies = JSON.parse(document.cookie)
    const config = {
      headers: { Authorization: `Bearer ${cookies.token}` }
    };
    console.log('CONFIG DATA:', config)

    //API CALL
    const getWorkoutPlans = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/workoutPlan/getWorkoutPlanWithUserWorkoutExerciseAll', 
          config
        );
        console.log('Response:', response)
        setData(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getWorkoutPlans()
    
  }, []);

  return (
    <>
      <h1><Link to = "/workout"> &lt; </Link>YOUR WORKOUTS</h1>
      {data.map((item, index) => (
        <Workout_plan_card key = {index} workoutPlan={item} />
      ))}
    </>
  );
};

export default WorkoutInput