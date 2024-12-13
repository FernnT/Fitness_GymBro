import { Request,Response } from "express";
import {db} from '../models/db';
import { records, userWorkoutExercise, workoutPlans, exercises } from "../models/schema";
import { eq, avg, and } from 'drizzle-orm';
import { calculateAndUpdatePlanIntensity } from '../utils/intensityCalculator';

interface AuthRequest extends Request {
    user?: {
        id: number;
    }
}

export const getUserWorkoutExerciseByID = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const { id } = req.params;

        // Join with workoutPlans to verify ownership
        const result = await db
            .select({
                exercise: userWorkoutExercise,
                plan: workoutPlans
            })
            .from(userWorkoutExercise)
            .innerJoin(
                workoutPlans,
                eq(workoutPlans.planId, userWorkoutExercise.planId)
            )
            .where(
                and(
                    eq(userWorkoutExercise.workoutExerciseId, parseInt(id)),
                    eq(workoutPlans.userId, userId)
                )
            );

        if (!result.length) {
            return res.status(404).send("Exercise not found or unauthorized");
        }

        res.status(200).send(result[0].exercise);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const updateUserWorkoutExercise = async (req: Request, res: Response) => {
   //TODO: update exercise
}

export const addExercise = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        // Verify user owns the workout plan
        const workoutPlan = await db.select()
            .from(workoutPlans)
            .where(eq(workoutPlans.planId, req.body.planId))
            .limit(1);

        if (!workoutPlan.length || workoutPlan[0].userId !== userId) {
            return res.status(403).send("Not authorized to modify this workout plan");
        }

        await db.insert(userWorkoutExercise).values(req.body);
        
        const updatedIntensity = await calculateAndUpdatePlanIntensity(req.body.planId);

        res.status(201).send({
            message: "Exercise added successfully",
            updatedIntensity
        });
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const deleteUserWorkoutExercise = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const { id } = req.params;
        // Verify user owns the exercise through workout plan
        const exercise = await db
            .select({
                exercise: userWorkoutExercise,
                plan: workoutPlans
            })
            .from(userWorkoutExercise)
            .innerJoin(
                workoutPlans,
                eq(workoutPlans.planId, userWorkoutExercise.planId)
            )
            .where(
                and(
                    eq(userWorkoutExercise.workoutExerciseId, parseInt(id)),
                    eq(workoutPlans.userId, userId)
                )
            );

        if (!exercise.length) {
            return res.status(404).send("Exercise not found or unauthorized");
        }

        const planId = exercise[0].exercise.planId;
        await db.delete(userWorkoutExercise)
            .where(eq(userWorkoutExercise.workoutExerciseId, parseInt(id)));

        const updatedIntensity = await calculateAndUpdatePlanIntensity(planId);

        return res.status(200).send({
            message: "Exercise deleted successfully",
            updatedIntensity
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const completeExercise = async (req: AuthRequest, res: Response) => {    
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const { id } = req.params;
        
        // Join with workoutPlans to verify ownership and check completion status
        const exerciseData = await db
            .select({
                exercise: userWorkoutExercise,
                plan: workoutPlans,
                exerciseDetails: exercises
            })
            .from(userWorkoutExercise)
            .innerJoin(
                workoutPlans,
                eq(workoutPlans.planId, userWorkoutExercise.planId)
            )
            .innerJoin(
                exercises,
                eq(exercises.exerciseId, userWorkoutExercise.exerciseId)
            )
            .where(
                and(
                    eq(userWorkoutExercise.workoutExerciseId, parseInt(id)),
                    eq(workoutPlans.userId, userId),
                    eq(userWorkoutExercise.completed, false) // Only get uncompleted exercises
                )
            );

        if (!exerciseData.length) {
            return res.status(400).send("Exercise not found, already completed, or unauthorized");
        }

        const exercise = exerciseData[0].exercise;
        const exerciseDetails = exerciseData[0].exerciseDetails;

        // Calculate calories burned
        // Basic formula: (MET value * weight in kg * duration in hours)
        // MET values: Strength training ≈ 3.5, Cardio ≈ 7.0
        const MET = exerciseDetails.metValue;
        const durationHours = (exercise.durationMin || 0) / 60;
        const weightKg = (exercise.weight || 70) / 2.205; // Convert lbs to kg, default to 70kg if not specified
        const caloriesBurned = Math.round(MET * weightKg * durationHours);

        // Update exercise completion status
        await db.update(userWorkoutExercise)
            .set({ completed: true })
            .where(eq(userWorkoutExercise.workoutExerciseId, parseInt(id)));


        console.log(exercise);
        // Create record
        await db.insert(records).values({
            userId,
            exerciseId: exercise.exerciseId,
            date: new Date().toISOString(),
            setsCompleted: exercise.sets,
            repsCompleted: exercise.reps,
            durationMin: exercise.durationMin,
            weight: exercise.weight || 0,
            distance: exercise.distance || 0,
            caloriesBurned,
        });

        res.status(200).send({ 
            message: "Exercise completed and recorded",
            caloriesBurned 
        });
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}




