import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getExerciseByID, getExercises } from "../controllers/exerciseControllers";

const exerciseRoutes = Router();

exerciseRoutes.get("/getExercises", authMiddleware, getExercises); 
exerciseRoutes.get("/getExerciseByID/:id", authMiddleware, getExerciseByID);


//USE THIS ROUTE IF YOU WANT TO PROTECT THE ENDPOINT // AFTER ALL IS DONE
//exerciseRoutes.get("/getExercises", authMiddleware, getExercises);
export default exerciseRoutes;