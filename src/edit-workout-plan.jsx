// REACT STUFF
import axios from "axios";
import React, { useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import '../src/App.css'

// ==============================================
// FUNCTIONS
// ==============================================

const sendData = async (id, workoutPlan) => {
  // NEW FORM DATA
  const form_data = workoutPlan

  if(document.getElementById("name").value !== ""){
    form_data.name = document.getElementById("name").value
  }
  if(document.getElementById("goal").value !== ""){
    form_data.goal = document.getElementById("goal").value
  }
  if(document.getElementById("durationDays").value !== ""){
    form_data.durationDays = document.getElementById("durationDays").value
  }
  if(document.getElementById("intensity").value !== ""){
    form_data.intensity = document.getElementById("intensity").value
  }
  console.log(form_data)
  
  // COOKIES TOKEN
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // API CALL
  const link = "http://localhost:3000/workoutPlan/updatePlan/" + id
  try {
    const response = await axios.put(
      link,
      form_data,
      config
    );
    console.log('Response:', response)
  } catch (error) {
    console.error('Error:', error);
  }
  window.location.reload();
};

// ==============================================
// RETURN
// ==============================================

const editWorkoutPlan = () => {

  // VARIABLES
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(0)
  const date = new Date(workoutPlan.createdAt);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  
  // FUNCTIONS
  useEffect(() => {
    const token = Cookies.get('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log('CONFIG DATA:', config)

    const link = "http://localhost:3000/workoutPlan/getWorkoutPlanByID/" + id
    const getWorkoutPlan = async () => {
      try {
        const response = await axios.get(
          link, 
          config
        );
        console.log('Response:', response)
        setWorkoutPlan(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getWorkoutPlan()
  }, []);

  // RETURN
  return (
    <>
      <h1><Link to = "/workouts-current"> &lt; </Link>Edit {workoutPlan.name}</h1>
      <p>created at: {formattedDate}</p>
      <p>progress: {workoutPlan.progress}</p>

      <label>name: {workoutPlan.name}</label><br/>
      <input type="text" id="name" name="name" required/><br /><br />
      
      <label>goal: {workoutPlan.goal}</label><br />
      <input type="text" id="goal" name="goal" required/><br /><br />
      
      <label>duration(days): {workoutPlan.durationDays}</label><br />
      <input type="text" id="durationDays" name="durationDays" required/><br /><br />
      
      <label>intensity: {workoutPlan.intensity}</label><br />
      <input type="text" id="intensity" name="intensity" required/><br /><br />
      
      <button onClick={() => sendData(id, workoutPlan)}>
        SUBMIT
      </button>
    </>
  );
};

export default editWorkoutPlan