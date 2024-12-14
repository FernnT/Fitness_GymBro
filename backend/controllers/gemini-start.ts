import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';
import { db } from '../models/db';
import { exercises, workoutPlans, userWorkoutExercise } from '../models/schema';
import { calculateAndUpdatePlanIntensity } from '../utils/intensityCalculator';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
interface AuthRequest extends Request {
    user?: {
        id: number;
    }
}

export const generateWorkoutPlan = async (req: AuthRequest, res: Response) => {
    let text = '';
    let cleanText = '';
    
    try {
        const userId = req.user?.id;
        const { goal, durationDays } = req.body;
        
        if (!goal || !durationDays || !userId) {
            return res.status(400).send("Goal, durationDays, and userId are required");
        }
        
        const availableExercises = await db.select().from(exercises);
        
        const prompt = `Return ONLY a valid JSON object (no explanations) for a workout plan:
        {
            "name": "Unique name based on goals",
            "goal": "${goal}",
            "durationDays": ${durationDays},
            "exercises": [
                {
                    "exerciseId": number (from available exercises),
                    "sets": number(0 for cardio exercises),
                    "reps": number(0 for cardio exercises),
                    "durationMin": number(0 for strength exercises),
                    "weight": number(0 for strength exercises),
                    "distance": number(0 for cardio exercises),
                    "restTimePerSec": number (60-120),
                    "day": string (Monday-Sunday)
                }
            ]
        }

        Available exercises: ${availableExercises.map(ex => `${ex.exerciseId}: ${ex.name}`).join(', ')}

        Rules: Use exerciseIds from available exercises. For cardio, use durationMin/distance (sets/reps=0). For strength, use sets/reps/weight (durationMin/distance=0). Include 3-6 exercises per day. Mix cardio and strength.`;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();

        // First, extract just the JSON part if there's extra text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No JSON object found in response');
        }
        
        cleanText = jsonMatch[0]
            .replace(/\n/g, ' ')           // Replace newlines with spaces
            .replace(/\s+/g, ' ')          // Normalize whitespace
            .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
            .trim();

        const planData = JSON.parse(cleanText);
        
        // Insert the workout plan first without intensity
        const [insertedPlan] = await db.insert(workoutPlans)
            .values({
                name: planData.name,
                goal: planData.goal,
                durationDays: planData.durationDays,
                intensity: null,  // Set initially to null
                progress: 0,
                completed: false,
                userId: userId,
                createdAt: new Date().toISOString()
            })
            .returning();

        // Insert exercises
        const exercisesWithPlanId = planData.exercises.map(exercise => ({
            exerciseId: exercise.exerciseId,
            planId: insertedPlan.planId,
            sets: exercise.sets,
            reps: exercise.reps,
            durationMin: exercise.durationMin,
            weight: exercise.weight,
            distance: exercise.distance,
            restTimePerSec: exercise.restTimePerSec,
            day: exercise.day,
            completed: false,
            createdAt: new Date().toISOString()
        }));

        await db.insert(userWorkoutExercise)
            .values(exercisesWithPlanId);

        // Calculate and update intensity after exercises are inserted
        const intensity = await calculateAndUpdatePlanIntensity(insertedPlan.planId);

        // Return the complete plan with exercises and calculated intensity
        res.status(201).json({
            ...insertedPlan,
            intensity,
            exercises: exercisesWithPlanId
        });
    } catch (error) {
        console.error('Error details:', {
            error,
            rawText: text,
            cleanedText: cleanText
        });
        res.status(500).send('Failed to generate and save workout plan. Please try again.');
    }
}