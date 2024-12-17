// REACT STUFF
import axios from "axios";
import React, { useState} from "react";
import Cookies from 'js-cookie';

// PAGE SPECIFIC
import '../src/App.css'
import Edit_exercise_card from './edit-exercise-card.jsx'

// ==============================================
// FUNCTIONS
// ==============================================

const deleteExercise = async (id) => {
  // GET CURRENCT COOKIES TO JSON
  console.log('RAW COOKIES', document.cookie)
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log('CONFIG DATA:', config)

  //API CALL
  const link = "http://localhost:3000/userWorkoutExercise/delete/" + id
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
  
  // window.location.reload();
}

const completeExercise = async (id) => {
  // GET CURRENCT COOKIES TO JSON
  console.log('RAW COOKIES', document.cookie)
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log('CONFIG DATA:', config)

  //API CALL
  const link = "http://localhost:3000/userWorkoutExercise/complete/" + id
  console.log("LINK: " + link)
  try {
    const response = await axios.post(
      link,{},
      config
    );
    console.log('Response:', response)
  } catch (error) {
    console.error('Error:', error)
  }
  
  // window.location.reload();
}

function showExercisesEdit(isShowedExerciseEdit, setIsShowedExerciseEdit) {
  if(isShowedExerciseEdit === 0){
    setIsShowedExerciseEdit(isShowedExerciseEdit => (1))
  }else{
    setIsShowedExerciseEdit(isShowedExerciseEdit => (0))
  }
}

// ==============================================
// RETURN
// ==============================================

const exerciseCard = ({exercise, show}) => {
  if(show === 0){
    return(<></>)
  }

  const [isShowedExerciseEdit, setIsShowedExerciseEdit] = useState(0)

  return (
    <>
      <hr/>
      <p>kind of exercise: {exercise.exerciseId}</p>
      <p>duration in min: {exercise.durationMin}</p>
      <p>reps: {exercise.reps}</p>
      <p>weight: {exercise.weight}</p>
      <p>sets: {exercise.sets}</p>
      <p>rest in sec: {exercise.restTimePerSec}</p>
      <p>day of week: {exercise.day}</p>
      <p>completion status: {String(exercise.completed)}</p>

      <Edit_exercise_card workoutExerciseId={exercise.workoutExerciseId} show={isShowedExerciseEdit}/>
      
      <button onClick={() => completeExercise(exercise.workoutExerciseId)}>
        COMPLETE THE EXERCISE
      </button>
      <button onClick={() => showExercisesEdit(isShowedExerciseEdit, setIsShowedExerciseEdit)}>
        EDIT
      </button>
      <button onClick={() => deleteExercise(exercise.workoutExerciseId)}>
        DELETE
      </button>
    </>
  );
};

export default exerciseCard