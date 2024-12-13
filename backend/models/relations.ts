import { relations } from "drizzle-orm/relations";
import { user, workoutPlans, userWorkoutExercise, workout, records } from "./schema";

export const workoutPlansRelations = relations(workoutPlans, ({one, many}) => ({
	user: one(user, {
		fields: [workoutPlans.userId],
		references: [user.userId]
	}),
	userWorkoutExercises: many(userWorkoutExercise),
}));

export const userRelations = relations(user, ({many}) => ({
	workoutPlans: many(workoutPlans),
	records: many(records),
}));

export const userWorkoutExerciseRelations = relations(userWorkoutExercise, ({one}) => ({
	workoutPlan: one(workoutPlans, {
		fields: [userWorkoutExercise.planId],
		references: [workoutPlans.planId]
	}),
	workout: one(workout, {
		fields: [userWorkoutExercise.workoutId],
		references: [workout.workoutId]
	}),
}));

export const workoutRelations = relations(workout, ({many}) => ({
	userWorkoutExercises: many(userWorkoutExercise),
	records: many(records),
}));

export const recordsRelations = relations(records, ({one}) => ({
	user: one(user, {
		fields: [records.userId],
		references: [user.userId]
	}),
	workout: one(workout, {
		fields: [records.workoutId],
		references: [workout.workoutId]
	}),
}));