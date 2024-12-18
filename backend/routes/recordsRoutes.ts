import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getRecords, getRecordsByID, totalCaloriesBurned } from "../controllers/recordsController";

const recordsRoutes = Router();

recordsRoutes.get("/getRecords", authMiddleware, getRecords);
recordsRoutes.get("/getRecordsByID/:id", authMiddleware, getRecordsByID);
recordsRoutes.get("/getTotalCaloriesBurned", authMiddleware, totalCaloriesBurned);

export default recordsRoutes;

