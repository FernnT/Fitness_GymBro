// REACT STUFF
import axios from "axios";
import React from "react";
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import '../src/App.css'

// ==============================================
// FUNCTIONS
// ==============================================

const sendData = async (planId) => {
  // NEW FORM DATA
  const form_data = {
    "planId": planId,
    "exerciseId": 10,
    "sets": 4,
    "reps": 12,
    "durationMin": 30,
    "weight": 50.5,
    "distance": 0,
    "restTimePerSec": 60,
    "day": "Monday"
  }

  form_data.exerciseId = document.getElementById("exercise_type").value
  form_data.sets = document.getElementById("sets").value
  form_data.reps = document.getElementById("reps").value
  form_data.durationMin = document.getElementById("duration").value
  form_data.weight = document.getElementById("weight").value
  form_data.distance = document.getElementById("distance").value
  form_data.restTimePerSec = document.getElementById("rest").value
  form_data.day = document.getElementById("day").value
  console.log(form_data)
  
  // COOKIES TOKEN
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // API CALL
  const link = "http://localhost:3000/userWorkoutExercise/addExercise"
  try {
    const response = await axios.post(
      link,
      form_data,
      config
    );
    console.log('Response:', response)
  } catch (error) {
    console.error('Error:', error);
  }
};

// ==============================================
// RETURN
// ==============================================

const addExerciseCard = ({planId, show}) => {
  if(show === 0){
    return(<></>)
  }

  return (
    <>
      <hr/>
      <div>
        <h2>NEW EXERCISE</h2>

        <label>exercise type:</label>
        <input type="text" id="exercise_type" name="exercise_type" required/><br />
        
        <label>sets:</label>
        <input type="text" id="sets" name="sets" required/><br />
        
        <label>reps:</label>
        <input type="text" id="reps" name="reps" required/><br />
        
        <label>duration(min):</label>
        <input type="text" id="duration" name="duration" required/><br />
        
        <label>weight:</label>
        <input type="text" id="weight" name="weight" required/><br />
        
        <label>distance:</label>
        <input type="text" id="distance" name="distance" required/><br />
        
        <label>rest time:</label>
        <input type="text" id="rest" name="rest" required/><br />
        
        <label>day(Monday, Tuesday, Wednesday, Thrusday, Friday, Saturday, Sunday):</label>
        <input type="text" id="day" name="day" required/><br />
        
        <button onClick={() => sendData(planId)}>
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default addExerciseCard