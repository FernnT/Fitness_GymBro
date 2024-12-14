import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import  authRoutes  from "./routes/authRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import workoutPlanRoutes from "./routes/workoutPlanRoutes";
import userWorkoutExerciseRoutes from "./routes/userWorkoutExerciseRoutes";
import recordsRoutes from "./routes/recordsRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use('/auth', authRoutes);
app.use('/exercise', exerciseRoutes);
app.use('/workoutPlan', workoutPlanRoutes);
app.use('/userWorkoutExercise', userWorkoutExerciseRoutes);
app.use('/records', recordsRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
