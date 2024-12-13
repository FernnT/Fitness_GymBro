import { db } from '../models/db';
import { exercises, userWorkoutExercise, workoutPlans } from '../models/schema';
import { eq } from 'drizzle-orm';

export async function calculateAndUpdatePlanIntensity(planId: number) {
    try {
        // Get all exercises for the plan
        const planExercises = await db
            .select({
                exerciseId: userWorkoutExercise.exerciseId
            })
            .from(userWorkoutExercise)
            .where(eq(userWorkoutExercise.planId, planId));

        if (!planExercises.length) {
            await db.update(workoutPlans)
                .set({ intensity: 'Moderate' })
                .where(eq(workoutPlans.planId, planId));
            return 'Moderate';
        }

        // Get intensity values for these exercises
        const exerciseIntensities = await db
            .select({
                intensity: exercises.intensity
            })
            .from(exercises)
            .where(eq(exercises.exerciseId, planExercises[0].exerciseId));

        // Calculate average intensity
        let intensityScore = exerciseIntensities.reduce((acc, curr) => {
            switch (curr.intensity.toLowerCase()) {
                case 'high': return acc + 3;
                case 'moderate': return acc + 2;
                case 'low': return acc + 1;
                default: return acc;
            }
        }, 0) / exerciseIntensities.length;

        // Convert score back to intensity level
        let averageIntensity = 'Moderate';
        if (intensityScore >= 2.5) averageIntensity = 'High';
        else if (intensityScore <= 1.5) averageIntensity = 'Low';

        // Update workout plan intensity
        await db.update(workoutPlans)
            .set({ intensity: averageIntensity })
            .where(eq(workoutPlans.planId, planId));

        return averageIntensity;
    } catch (error) {
        console.error('Error calculating intensity:', error);
        throw error;
    }
} 