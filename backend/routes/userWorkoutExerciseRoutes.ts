import { Router } from "express";
import { addExercise, getUserWorkoutExerciseByID, deleteUserWorkoutExercise, completeExercise, updateUserWorkoutExercise, getUserWorkoutExerciseByPlanId } from "../controllers/userWorkoutExerciseController";
import { authMiddleware } from "../middlewares/authMiddleware";
const userWorkoutExerciseRouter = Router();

userWorkoutExerciseRouter.get("/getUserWorkoutExerciseByID/:id", authMiddleware, getUserWorkoutExerciseByID);
userWorkoutExerciseRouter.get("/getUserWorkoutExerciseByPlanId/:planId", authMiddleware, getUserWorkoutExerciseByPlanId);
userWorkoutExerciseRouter.post("/addExercise", authMiddleware, addExercise);
userWorkoutExerciseRouter.post("/complete/:id", authMiddleware, completeExercise);
userWorkoutExerciseRouter.put("/update/:id", authMiddleware, updateUserWorkoutExercise);
userWorkoutExerciseRouter.delete("/delete/:id", authMiddleware, deleteUserWorkoutExercise);

export default userWorkoutExerciseRouter;
