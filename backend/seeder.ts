import { db } from "./models/db"; // Replace with your actual db connection file
import { exercises, } from "./models/schema"; // Replace with your schema file path
import type { InferModel } from 'drizzle-orm';

type Exercise = InferModel<typeof exercises>;
console.log("Seeder loaded");
export const seedExercises = async () => {
    try {
        console.log("Seeding exercises...");
        const exerciseData: Omit<Exercise, 'exerciseId'>[] = [
            {
                name: "Dumbbell Shoulder Press",
                exerciseType: "Equipment",
                description: "A strength exercise focusing on building shoulder muscles.",
                bodyPart: "Upper Body",
                primaryMuscle: "Deltoids",
                secondaryMuscle: "Triceps Brachii",
                metValue: 4.0,
                intensity: "Moderate",
                imageUrl: "https://example.com/images/dumbbell-shoulder-press.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Push-Ups",
                exerciseType: "Reps Only",
                description: "A bodyweight exercise targeting the chest, shoulders, and triceps.",
                bodyPart: "Upper Body",
                primaryMuscle: "Pectoralis Major",
                secondaryMuscle: "Triceps Brachii",
                metValue: 8.0,
                intensity: "Moderate",
                imageUrl: "https://example.com/images/push-ups.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Squats",
                exerciseType: "Reps Only",
                description: "A compound exercise that strengthens the lower body and core.",
                bodyPart: "Lower Body",
                primaryMuscle: "Quadriceps",
                secondaryMuscle: "Gluteus Maximus",
                metValue: 5.0,
                intensity: "Moderate",
                imageUrl: "https://example.com/images/squats.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Running",
                exerciseType: "Cardio",
                description: "A cardio exercise to improve endurance and cardiovascular health.",
                bodyPart: "Full Body",
                primaryMuscle: "Hamstrings",
                secondaryMuscle: "Calves",
                metValue: 11.0,
                intensity: "High",
                imageUrl: "https://example.com/images/running.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Bicep Curls",
                exerciseType: "Equipment",
                description: "An isolation exercise for building bicep strength using dumbbells or barbells.",
                bodyPart: "Upper Body",
                primaryMuscle: "Biceps Brachii",
                secondaryMuscle: "Brachialis",
                metValue: 3.5,
                intensity: "Low",
                imageUrl: "https://example.com/images/bicep-curls.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Deadlifts",
                exerciseType: "Equipment",
                description: "A full-body compound lift focusing on the posterior chain.",
                bodyPart: "Full Body",
                primaryMuscle: "Hamstrings",
                secondaryMuscle: "Erector Spinae",
                metValue: 6.0,
                intensity: "High",
                imageUrl: "https://example.com/images/deadlifts.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Plank",
                exerciseType: "Reps Only",
                description: "A core exercise that builds strength and stability in the abdominal muscles.",
                bodyPart: "Core",
                primaryMuscle: "Rectus Abdominis",
                secondaryMuscle: "Obliques",
                metValue: 4.0,
                intensity: "Moderate",
                imageUrl: "https://example.com/images/plank.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Jump Rope",
                exerciseType: "Cardio",
                description: "A cardio exercise to improve coordination and burn calories.",
                bodyPart: "Full Body",
                primaryMuscle: "Calves",
                secondaryMuscle: "Forearms",
                metValue: 12.0,
                intensity: "High",
                imageUrl: "https://example.com/images/jump-rope.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Bench Press",
                exerciseType: "Equipment",
                description: "A strength exercise focusing on the chest, shoulders, and triceps.",
                bodyPart: "Upper Body",
                primaryMuscle: "Pectoralis Major",
                secondaryMuscle: "Triceps Brachii",
                metValue: 5.5,
                intensity: "High",
                imageUrl: "https://example.com/images/bench-press.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Lunges",
                exerciseType: "Reps Only",
                description: "A lower body exercise that improves strength and balance.",
                bodyPart: "Lower Body",
                primaryMuscle: "Quadriceps",
                secondaryMuscle: "Gluteus Maximus",
                metValue: 4.5,
                intensity: "Moderate",
                imageUrl: "https://example.com/images/lunges.png",
                createdAt: new Date().toISOString()
            },
            {
                name: "Cycling",
                exerciseType: "Cardio",
                description: "An endurance exercise to improve cardiovascular health and lower body strength.",
                bodyPart: "Lower Body",
                primaryMuscle: "Quadriceps",
                secondaryMuscle: "Hamstrings",
                metValue: 10.0,
                intensity: "High",
                imageUrl: "https://example.com/images/cycling.png",
                createdAt: new Date().toISOString()
            },
        ];

        await db.insert(exercises).values(exerciseData as Exercise[]);

        console.log("Exercise seed data inserted successfully.");
    } catch (error) {
        console.error("Error inserting exercise seed data:", error);
    }
};

seedExercises();