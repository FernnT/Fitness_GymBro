// REACT STUFF
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';


// PAGE SPECIFIC
import './App.css'

const createWorkout = async (navigate) => {
  
  //GET FORM DATA FROM INPUT
  const form_data = { 
    "name": "postman2",
    "durationDays": "30",
    "goal": "ABS"
  }
  form_data.name = document.getElementById("name").value
  form_data.durationDays = document.getElementById("duration").value
  form_data.goal = document.getElementById("goal").value
  console.log('FORM DATA:', form_data)

  // GET CURRENCT COOKIES TO JSON
  
  console.log('RAW COOKIES', document.cookie)
  const cookies = JSON.parse(document.cookie)
  console.log('COOKIES IN JSON', cookies)
  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` }
  };
  console.log('CONFIG DATA:', config)

  //API CALL
  try {
    const response = await axios.post(
      'http://localhost:3000/workoutPlan/createWorkoutPlan',
      form_data, config
    );
    console.log('Response:', response)
    if(response.status === 200){
      document.cookie = JSON.stringify(response.data)
      console.log("COOKIES IN PLAIN TEXT", document.cookie)
      check_if_already_logged_in(navigate)
    }
  } catch (error) {
    console.error('Error:', error)
  }
  
};

const WorkoutEdit = () => {
  const { id } = useParams();

  return (
    <>
      <h1><Link to = "/workout"> &lt; </Link> WORKOUT INPUT (temp)</h1>
      
      <label>Workout Name:</label>
      <input type="name" id="name" name="name" required/><br></br>
      <label>Duration in Days:</label>
      <input type="duration" id="duration" name="duration" required/><br></br>
      <label>Goal:</label>
      <input type="goal" id="goal" name="goal" required/><br></br>
      
      <button onClick={() => createWorkout()}>
        SUBMIT
      </button>
    </>
  );
};

export default WorkoutEdit