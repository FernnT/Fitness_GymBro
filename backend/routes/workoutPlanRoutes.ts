import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {createWorkoutPlan, getWorkoutPlanByID, getWorkoutPlans, getWorkoutPlanWithUserWorkoutExerciseById, getWorkoutPlanWithUserWorkoutExerciseAll, updateWorkoutPlan, deleteWorkoutPlan } from '../controllers/workoutPlanController'
import { generateWorkoutPlan } from "../controllers/gemini-start";

const workoutPlanRoutes = Router()



workoutPlanRoutes.post('/createWorkoutPlan',authMiddleware, createWorkoutPlan) 
workoutPlanRoutes.get('/getWorkoutPlans',authMiddleware, getWorkoutPlans) 
workoutPlanRoutes.get('/getWorkoutPlanWithUserWorkoutExercise/:id',authMiddleware, getWorkoutPlanWithUserWorkoutExerciseById)
workoutPlanRoutes.get('/getWorkoutPlanWithUserWorkoutExerciseAll',authMiddleware, getWorkoutPlanWithUserWorkoutExerciseAll)
workoutPlanRoutes.get('/getWorkoutPlanByID/:id',authMiddleware, getWorkoutPlanByID) 
workoutPlanRoutes.put('/updatePlan/:id',authMiddleware, updateWorkoutPlan)
workoutPlanRoutes.delete('/deletePlan/:id',authMiddleware, deleteWorkoutPlan)
workoutPlanRoutes.post("/generate",authMiddleware,generateWorkoutPlan);   

        
export default workoutPlanRoutes;