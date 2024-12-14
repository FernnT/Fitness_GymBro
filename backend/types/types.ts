// Auth Types
export interface AuthRequest extends Request {
    user?: {
        id: number;
    }
}

// User Types
export interface UserData {
    userId: number;
    username: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    createdAt: string;
}

// Workout Plan Types
export interface WorkoutPlan {
    planId: number;
    userId: number;
    name: string;
    intensity: string | null;
    durationDays: number;
    daysCompleted: number;
    goal: string;
    progress: number;
    completed: boolean;
    createdAt: string;
}

// Exercise Types
export interface Exercise {
    exerciseId: number;
    name: string;
    exerciseType: 'Cardio' | 'Equipment' | 'Reps Only';
    description: string;
    bodyPart: string;
    primaryMuscle: string;
    secondaryMuscle: string;
    metValue: number;
    intensity: string;
    imageUrl?: string;
    createdAt: string;
}

// User Workout Exercise Types
export interface UserWorkoutExercise {
    workoutExerciseId: number;
    planId: number;
    exerciseId: number;
    sets: number;
    reps: number;
    durationMin: number;
    weight: number;
    distance: number;
    restTimePerSec: number;
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    completed: boolean;
    createdAt: string;
}

// Record Types
export interface Record {
    recordId: number;
    userId: number;
    exerciseId: number;
    date: string;
    setsCompleted: number;
    repsCompleted: number;
    durationMin: number;
    weight: number;
    distance: number;
    caloriesBurned: number;
    createdAt: string;
}

// Request Body Types
export interface UpdatePasswordRequest {
    password: string;
}

export interface UpdateUsernameRequest {
    username: string;
}

export interface UpdateHeightWeightRequest {
    height: number;
    weight: number;
}

export interface GenerateWorkoutPlanRequest {
    goal: string;
    durationDays: number;
} 