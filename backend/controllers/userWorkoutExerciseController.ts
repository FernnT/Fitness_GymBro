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
        const exercise = await db.select()
            .from(userWorkoutExercise)
            .where(eq(userWorkoutExercise.workoutExerciseId, parseInt(id)));

        if (!exercise[0]) {
             res.status(404).send("Exercise not found");
             return;    
        }

        // Update exercise to completed
        await db.update(userWorkoutExercise)
            .set({ completed: true})
            .where(eq(userWorkoutExercise.workoutExerciseId, parseInt(id)));

        // Get workout plan to get userId
        const plan = await db.select()
            .from(workoutPlans)
            .where(eq(workoutPlans.planId, exercise[0].planId));

        // Create record
        const record = await db.insert(records).values({
            userId: plan[0].userId,
            exerciseId: exercise[0].exerciseId,
            date: new Date().toISOString(),
            setsCompleted: exercise[0].sets,
            repsCompleted: exercise[0].reps,
            durationMin: exercise[0].durationMin,
            weight: exercise[0].weight || 0,
            distance: exercise[0].distance || 0,
            caloriesBurned: 0, // TODO: calculate this based on exercise details
        });

         res.status(200).send({ message: "Exercise completed and recorded" });
         return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}




