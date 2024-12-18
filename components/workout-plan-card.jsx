// REACT STUFF
import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import '../src/App.css'
import Add_exercise_card from './add-exercise-card.jsx'
import Exercise_card from './exercise-card.jsx'

// ==============================================
// FUNCTIONS
// ==============================================

const deleteWorkout = async (id) => {
  // GET CURRENCT COOKIES TO JSON
  
  console.log('RAW COOKIES', document.cookie)
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log('CONFIG DATA:', config)

  //API CALL
  const link = "http://localhost:3000/workoutPlan/deletePlan/" + id
  console.log(link)
  try {
    const response = await axios.delete(
      link,
      config
    );
    console.log('Response:', response)
  } catch (error) {
    console.error('Error:', error)
  }
  
  window.location.reload();
}

function editWorkoutPlan(navigation, workoutPlanId){
  const link = "/edit-workout-plan/" + workoutPlanId
  navigation(link)
}

function showExercises(isShowedExercise, setIsShowedExercise) {
  if(isShowedExercise === 0){
    setIsShowedExercise(isShowedExercise => (1))
  }else{
    setIsShowedExercise(isShowedExercise => (0))
  }
}

function showExercisesAdd(isShowedExerciseAdd, setIsShowedExerciseAdd) {
  if(isShowedExerciseAdd === 0){
    setIsShowedExerciseAdd(isShowedExerciseAdd => (1))
  }else{
    setIsShowedExerciseAdd(isShowedExerciseAdd => (0))
  }
}

// ==============================================
// RETURN
// ==============================================

const workotuPlanCard = ({workoutPlan}) => {

  const navigate = useNavigate();

  const date = new Date(workoutPlan.createdAt);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  const [isShowedExercise, setIsShowedExercise] = useState(0)
  const [isShowedExerciseAdd, setIsShowedExerciseAdd] = useState(0)



  return (
    <>
      <div>
        <h3>{workoutPlan.name}</h3>
        <p>created at: {formattedDate}</p>
        <p>goal: {workoutPlan.goal}</p>
        <p>progress: {workoutPlan.progress}</p>
        <p>duration: {workoutPlan.durationDays} days</p>
        <p>intensity: {workoutPlan.intensity}</p>

        <button onClick={() => deleteWorkout(workoutPlan.planId)}>
          DELETE
        </button>
        <button onClick={() => editWorkoutPlan(navigate, workoutPlan.planId)}>
          EDIT PLAN
        </button>
        <button onClick={() => showExercisesAdd(isShowedExerciseAdd, setIsShowedExerciseAdd)}>
          ADD EXERCISE
        </button>
        <button onClick={() => showExercises(isShowedExercise, setIsShowedExercise)}>
          SHOW EXERCISES
        </button>

        <Add_exercise_card planId={workoutPlan.planId} show={isShowedExerciseAdd}/>

        {workoutPlan.exercises.map((item, index) => (
          <Exercise_card key = {index} exercise={item} show={isShowedExercise}/>
        ))}
      </div>
      <hr/>
      <hr/>
      <hr/>
    </>
  );
};

export default workotuPlanCard