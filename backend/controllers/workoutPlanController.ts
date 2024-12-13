import { Request,Response } from "express";
import {db} from '../models/db';
import { workoutPlans } from "../models/schema";
import { eq, and } from 'drizzle-orm';
import { userWorkoutExercise } from "../models/schema";

interface AuthRequest extends Request {
    user?: {
        id: number;
    }
}

export const getWorkoutPlans = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
             res.status(401).send("User not authenticated");
             return
        }
        
        const result = await db.select()
            .from(workoutPlans)
            .where(eq(workoutPlans.userId, userId));

        if (!result.length) {
            res.status(404).send("No workout plans found for this user");
            return;
        }
        res.status(200).send(result);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export const deleteWorkoutPlan = async (req: AuthRequest, res: Response) => {
    //TODO: Implement this and test it
    try {
        const { id } = req.params; // Workout Plan ID
        const userId = req.user?.id; // Authenticated User ID

        if (!id) {
            return res.status(400).send({ error: "Plan ID is required." });
        }

        if (!userId) {
            return res.status(401).send({ error: "User not authenticated." });
        }

        const planId = parseInt(id);

        // Verify the workout plan exists and belongs to the user
        const workoutPlanExists = await db
            .select()
            .from(workoutPlans)
            .where(and(eq(workoutPlans.planId, planId), eq(workoutPlans.userId, userId)));

        if (!workoutPlanExists.length) {
            return res.status(404).send({ error: "Workout plan not found or does not belong to the user." });
        }

        // Delete associated userWorkoutExercise records
        await db
            .delete(userWorkoutExercise)
            .where(eq(userWorkoutExercise.planId, planId));

        // Delete the workout plan
        await db
            .delete(workoutPlans)
            .where(eq(workoutPlans.planId, planId));

        console.log(`Deleted workout plan (ID: ${planId}) and its exercises.`);
        return res.status(200).send({ message: "Workout plan and associated exercises deleted successfully." });
    } catch (error: any) {
        console.error("Error deleting workout plan:", error);
        return res.status(500).send({ error: "An unexpected error occurred." });
    }
};

export const getWorkoutPlanByID = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        const result = await db.select()
            .from(workoutPlans)
            .where(
                and(
                    eq(workoutPlans.planId, parseInt(id)),
                    eq(workoutPlans.userId, userId)
                )
            );

        if (!result.length) {
            return res.status(404).send("Workout plan not found or unauthorized");
        }

        res.status(200).send(result[0]);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const createWorkoutPlan = async(req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send("User not authenticated");
    }
    try {
       await db.insert(workoutPlans).values({...req.body, userId});
         res.status(201).send("Workout Plan created successfully")
         return;    
    } catch (error) {
        res.status(500).send(error.message)
        return;
    }

}

export const getWorkoutPlanWithUserWorkoutExerciseById = async (req: AuthRequest,res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id) {
            return res.status(400).send({ error: "Plan ID is required" });
        }

        if (!userId) {
            return res.status(401).send({ error: "User not authenticated" });
        }

        // Fetch the workout plan and its exercises
        const result = await db
            .select({
                plan: workoutPlans,
                exercise: userWorkoutExercise,
            })
            .from(workoutPlans)
            .leftJoin(
                userWorkoutExercise,
                eq(workoutPlans.planId, userWorkoutExercise.planId)
            )
            .where(
                and(
                    eq(workoutPlans.planId, parseInt(id)),
                    eq(workoutPlans.userId, userId)
                )
            );

        if (result.length === 0) {
            return res.status(404).send({ error: "Workout plan not found or no exercises associated" });
        }

        // Structure the response
        const workoutPlan = {
            planId: result[0].plan.planId,
            name: result[0].plan.name,
            intensity: result[0].plan.intensity,
            durationDays: result[0].plan.durationDays,
            goal: result[0].plan.goal,
            progress: result[0].plan.progress,
            completed: result[0].plan.completed,
            createdAt: result[0].plan.createdAt,
            exercises: result
                .filter((item) => item.exercise) // Filter out null exercises
                .map((item) => ({
                    planId: item.plan.planId,
                    workoutExerciseId: item.exercise.workoutExerciseId,
                    exerciseId: item.exercise.exerciseId,
                    sets: item.exercise.sets,
                    reps: item.exercise.reps,
                    durationMin: item.exercise.durationMin,
                    weight: item.exercise.weight,
                    distance: item.exercise.distance,
                    restTimePerSec: item.exercise.restTimePerSec,
                    day: item.exercise.day,
                    completed: item.exercise.completed,
                    createdAt: item.exercise.createdAt,
                })),
        };

        console.log("Fetched workout plan with exercises:", workoutPlan);
        return res.status(200).json(workoutPlan);
    } catch (error: any) {
        console.error("Error fetching workout plan by ID:", error);
        return res.status(500).send({ error: "An unexpected error occurred." });
    }
};


export const getWorkoutPlanWithUserWorkoutExerciseAll = async (req: AuthRequest,res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res
                .status(400)
                .send({ error: "User ID is missing from the request." });
        }

        // Fetch workout plans and associated exercises
        const result = await db
            .select()
            .from(workoutPlans)
            .leftJoin(
                userWorkoutExercise,
                eq(workoutPlans.planId, userWorkoutExercise.planId)
            )
            .where(eq(workoutPlans.userId, userId));

        if (result.length === 0) {
            return res
                .status(404)
                .send({ message: "No workout plans or exercises found for the user." });
        }

        // Group exercises by workout plan
        const groupedData = result.reduce((acc, curr) => {
            const planId = curr["Workout Plans"].planId;

            if (!acc[planId]) {
                acc[planId] = {
                    planId: curr["Workout Plans"].planId,
                    name: curr["Workout Plans"].name,
                    intensity: curr["Workout Plans"].intensity,
                    durationDays: curr["Workout Plans"].durationDays,
                    goal: curr["Workout Plans"].goal,
                    progress: curr["Workout Plans"].progress,
                    completed: curr["Workout Plans"].completed,
                    createdAt: curr["Workout Plans"].createdAt,
                    exercises: [],
                };
            }

            // Add the exercise to the workout plan if it exists
            if (curr["User Workout Exercise"]) {
                acc[planId].exercises.push({
                    planId: curr["Workout Plans"].planId,
                    workoutExerciseId: curr["User Workout Exercise"].workoutExerciseId,
                    exerciseId: curr["User Workout Exercise"].exerciseId,
                    sets: curr["User Workout Exercise"].sets,
                    reps: curr["User Workout Exercise"].reps,
                    durationMin: curr["User Workout Exercise"].durationMin,
                    weight: curr["User Workout Exercise"].weight,
                    distance: curr["User Workout Exercise"].distance,
                    restTimePerSec: curr["User Workout Exercise"].restTimePerSec,
                    day: curr["User Workout Exercise"].day,
                    completed: curr["User Workout Exercise"].completed,
                    createdAt: curr["User Workout Exercise"].createdAt,
                });
            }

            return acc;
        }, {} as Record<number, any>);

        // Convert the grouped object into an array
        const response = Object.values(groupedData);

        console.log("Fetched workout plans with exercises:", response);
        res.status(200).json(response);
    } catch (error: any) {
        console.error("Error fetching workout plans and exercises:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
    }
};

export const updateWorkoutPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        // Verify the workout plan exists and belongs to the user
        const workoutPlan = await db.select()
            .from(workoutPlans)
            .where(
                and(
                    eq(workoutPlans.planId, parseInt(id)),
                    eq(workoutPlans.userId, userId)
                )
            );

        if (!workoutPlan.length) {
            return res.status(404).send("Workout plan not found or unauthorized");
        }

        await db.update(workoutPlans)
            .set({ ...req.body })
            .where(eq(workoutPlans.planId, parseInt(id)));

        res.status(200).send("Workout Plan updated successfully");
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

