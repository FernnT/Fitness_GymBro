import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {createWorkoutPlan, getWorkoutPlanByID, getWorkoutPlans, getWorkoutPlanWithUserWorkoutExerciseById, getWorkoutPlanWithUserWorkoutExerciseAll, updateWorkoutPlan, deleteWorkoutPlan } from '../controllers/workoutPlanController'

const workoutPlanRoutes = Router()

// workoutPlanRoutes.post('/createWorkoutPlan', createWorkoutPlan) 
// workoutPlanRoutes.get('/getWorkoutPlans', getWorkoutPlans) 
// workoutPlanRoutes.get('/getWorkoutPlanWithUserWorkoutExercise/:id', getWorkoutPlanWithUserWorkoutExercise) 
// workoutPlanRoutes.get('/:id', getWorkoutPlanByID) //


workoutPlanRoutes.post('/createWorkoutPlan',authMiddleware, createWorkoutPlan) 
workoutPlanRoutes.get('/getWorkoutPlans',authMiddleware, getWorkoutPlans) 
workoutPlanRoutes.get('/getWorkoutPlanWithUserWorkoutExercise/:id',authMiddleware, getWorkoutPlanWithUserWorkoutExerciseById)
workoutPlanRoutes.get('/getWorkoutPlanWithUserWorkoutExerciseAll',authMiddleware, getWorkoutPlanWithUserWorkoutExerciseAll)
workoutPlanRoutes.get('/getWorkoutPlanByID/:id',authMiddleware, getWorkoutPlanByID) 
workoutPlanRoutes.put('/updatePlan/:id',authMiddleware, updateWorkoutPlan)
workoutPlanRoutes.delete('/deletePlan/:id',authMiddleware, deleteWorkoutPlan)


export default workoutPlanRoutes;