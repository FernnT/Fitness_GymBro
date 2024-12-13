import { Router } from "express";
import { addExercise, getUserWorkoutExerciseByID, deleteUserWorkoutExercise, completeExercise, updateUserWorkoutExercise } from "../controllers/userWorkoutExerciseController";
import { authMiddleware } from "../middlewares/authMiddleware";
const userWorkoutExerciseRouter = Router();

userWorkoutExerciseRouter.get("/getUserWorkoutExerciseByID/:id", authMiddleware, getUserWorkoutExerciseByID);
userWorkoutExerciseRouter.post("/addExercise", authMiddleware, addExercise);
userWorkoutExerciseRouter.post("/complete/:id", authMiddleware, completeExercise);
//userWorkoutExerciseRouter.post("/update/:id", authMiddleware, updateUserWorkoutExercise);
userWorkoutExerciseRouter.delete("/delete/:id", authMiddleware, deleteUserWorkoutExercise);

export default userWorkoutExerciseRouter;
