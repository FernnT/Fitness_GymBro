// REACT STUFF
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom'

// PAGE SPECIFIC
import '../src/App.css'

const deleteWorkout = async (id) => {
  // GET CURRENCT COOKIES TO JSON
  
  console.log('RAW COOKIES', document.cookie)
  const cookies = JSON.parse(document.cookie)
  console.log('COOKIES IN JSON', cookies)
  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` }
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
}

const workotuPlanCard = ({workoutPlan}) => {
  const link_to_edit = '/workout-edit/:' + workoutPlan.planId
  console.log("BITCH" + workoutPlan)

  return (
    <>
        <div>
          <Link to = {link_to_edit}>
            <h3>{workoutPlan.name}</h3>
          </Link>
          <p>goal: {workoutPlan.goal}</p>
          <p>progress: {workoutPlan.progress}</p>
          <p>created at: {workoutPlan.createdAt}</p>
          <button onClick={() => deleteWorkout(workoutPlan.planId)}>
            DELETE
          </button>
        </div>
        <hr/>
    </>
  );
};

export default workotuPlanCard