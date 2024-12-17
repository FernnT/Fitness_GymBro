// REACT STUFF
import axios from "axios";
import React, { useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import './App.css'
import Workout_plan_card from '../components/workout-plan-card.jsx'

const WorkoutInput = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // GET CURRENCT COOKIES TO JSON THEN GET TOKEN
  
    const token = Cookies.get('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
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
      <h1><Link to = "/workout"> &lt; </Link>MY WORKOUTS</h1>
      <p>When all the the entries in the same day and plan are true it adds 1 to the days completed and increases the progress</p>
      <hr/>
      <hr/>
      <hr/>
      {data.map((item, index) => (
        <Workout_plan_card key = {index} workoutPlan={item} />
      ))}
    </>
  );
};

export default WorkoutInput