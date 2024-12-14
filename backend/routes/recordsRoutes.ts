import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getRecords, getRecordsByID } from "../controllers/recordsController";

const recordsRoutes = Router();

recordsRoutes.get("/getRecords", authMiddleware, getRecords);
recordsRoutes.get("/getRecordsByID/:id", authMiddleware, getRecordsByID);

export default recordsRoutes;

