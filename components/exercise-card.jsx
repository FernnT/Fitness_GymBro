// REACT STUFF
import React from "react";
import {Link} from 'react-router-dom'

// PAGE SPECIFIC
import '../src/App.css'
import Workout_edit from '../src/workout-edit'

const workotuPlanCard = ({workoutPlan}) => {
  return (
    <>
      <Link to = '/workout-edit'>
        <div>
          <h3>{workoutPlan.name}</h3>
          <p>goal: {workoutPlan.goal}</p>
          <p>progress: {workoutPlan.progress}</p>
          <p>created at: {workoutPlan.createdAt}</p>
        </div>
      </Link>
    </>
  );
};

export default workotuPlanCard