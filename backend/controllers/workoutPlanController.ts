import { Request,Response } from "express";
import {db} from '../models/db';
import { WorkoutPlan, workoutPlans } from "../models/schema";
import { eq, and, sql } from 'drizzle-orm';
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
    try {
        const { id } = req.params; // Workout Plan ID
        const userId = req.user?.id; // Authenticated User ID

        if (!id) {
             res.status(400).send({ error: "Plan ID is required." });
             return;
        }

        if (!userId) {
            res.status(401).send({ error: "User not authenticated." });
            return;
        }

        const planId = parseInt(id);

        // Verify the workout plan exists and belongs to the user
        const workoutPlanExists = await db
            .select()
            .from(workoutPlans)
            .where(and(eq(workoutPlans.planId, planId), eq(workoutPlans.userId, userId)));

        if (!workoutPlanExists.length) {
            res.status(404).send({ error: "Workout plan not found or does not belong to the user." });
            return;
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
        res.status(200).send({ message: "Workout plan and associated exercises deleted successfully." });
        return;
    } catch (error: any) {
        console.error("Error deleting workout plan:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
        return;
    }
};

export const getWorkoutPlanByID = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
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
            res.status(404).send("Workout plan not found or unauthorized");
            return;
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
        res.status(401).send("User not authenticated");
        return;
    }
    if (!req.body.name || !req.body.goal || !req.body.durationDays) {
         res.status(400).send({ error: "Missing required fields in the request body." });
         return
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

export const getWorkoutPlanWithUserWorkoutExerciseById = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
             res.status(401).send("User not authenticated");
             return;
        }

        const { id } = req.params;

        const result = await db
            .select({
                plan: workoutPlans,
                exercises: userWorkoutExercise
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

        if (!result.length) {
            res.status(404).send("Workout plan not found or unauthorized");
            return;
        }

        // Format the response
        const formattedResponse = {
            planId: result[0].plan.planId,
            name: result[0].plan.name,
            intensity: result[0].plan.intensity,
            durationDays: result[0].plan.durationDays,
            goal: result[0].plan.goal,
            progress: result[0].plan.progress,
            completed: result[0].plan.completed,
            createdAt: result[0].plan.createdAt,
            exercises: result
                .filter(r => r.exercises) // Filter out null exercises
                .map(r => ({
                    workoutExerciseId: r.exercises.workoutExerciseId,
                    exerciseId: r.exercises.exerciseId,
                    sets: r.exercises.sets,
                    reps: r.exercises.reps,
                    durationMin: r.exercises.durationMin,
                    weight: r.exercises.weight,
                    distance: r.exercises.distance,
                    restTimePerSec: r.exercises.restTimePerSec,
                    day: r.exercises.day,
                    completed: r.exercises.completed,
                    createdAt: r.exercises.createdAt
                }))
        };

        res.status(200).json(formattedResponse);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const getWorkoutPlanWithUserWorkoutExerciseAll = async (req: AuthRequest,res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(400).send({ error: "User ID is missing from the request." });
            return;
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
            res.status(404).send({ message: "No workout plans or exercises found for the user." });
            return;
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
        return;
    } catch (error: any) {
        console.error("Error fetching workout plans and exercises:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
        return;
    }
};

export const updateWorkoutPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
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
            res.status(404).send("Workout plan not found or unauthorized");
            return;
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

export const updateWorkoutPlanProgress = async (planId: number) => {
    try {
        // Update the days completed in a single query
        await db.update(workoutPlans)
            .set({
                daysCompleted: sql`${workoutPlans.daysCompleted} + 1`, // Increment by 1
            })
            .where(eq(workoutPlans.planId, planId));

        console.log(`Days completed incremented for planId: ${planId}`);

        // Get the updated plan details
        const [plan] = await db.select({
            daysCompleted: workoutPlans.daysCompleted,
            durationDays: workoutPlans.durationDays
        })
        .from(workoutPlans)
        .where(eq(workoutPlans.planId, planId));

        // Calculate progress as percentage
        const progress = Math.round((plan.daysCompleted / plan.durationDays) * 100);
    
        // Update the progress field
        await db.update(workoutPlans)
            .set({
                progress: progress // Update progress to calculated value
            })
            .where(eq(workoutPlans.planId, planId));

        console.log(`Progress updated to ${progress}% for planId: ${planId}`);

    } catch (error) {
        console.error("Error updating workout plan progress:", error);
        throw error; // Re-throw to propagate the error
    }
};
