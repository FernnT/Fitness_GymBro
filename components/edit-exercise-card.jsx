// REACT STUFF
import axios from "axios";
import React from "react";
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import '../src/App.css'

// ==============================================
// FUNCTIONS
// ==============================================

const sendData = async (workoutExerciseId) => {
  // NEW FORM DATA
  const form_data = {
    "sets": 4,
    "reps": 12,
    "durationMin": 30,
    "weight": 50.5,
    "distance": 0,
  }

  if(document.getElementById("sets").value !== ""){
    form_data.sets = document.getElementById("sets").value
  }
  if(document.getElementById("reps").value !== ""){
    form_data.reps = document.getElementById("reps").value
  }
  if(document.getElementById("duration").value !== ""){
    form_data.durationMin = document.getElementById("duration").value
  }
  if(document.getElementById("weight").value !== ""){
    form_data.weight = document.getElementById("weight").value
  }
  if(document.getElementById("distance").value !== ""){
    form_data.distance = document.getElementById("distance").value
  }
  console.log(form_data)
  
  // COOKIES TOKEN
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // API CALL
  const link = "http://localhost:3000/userWorkoutExercise/update/" + workoutExerciseId
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
};

// ==============================================
// RETURN
// ==============================================

const addExerciseCard = ({workoutExerciseId, show}) => {
  if(show === 0){
    return(<></>)
  }

  return (
    <>
      <div>
        <h2>EDIT EXERCISE</h2>

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
        
        <button onClick={() => sendData(workoutExerciseId)}>
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default addExerciseCard