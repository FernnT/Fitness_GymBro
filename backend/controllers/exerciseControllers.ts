import { Request,Response } from "express";
import {db} from '../models/db';
import { exercises } from "../models/schema";
import { eq,asc } from "drizzle-orm";

export const getExercises = async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(exercises).orderBy(asc(exercises.name));
         res.status(200).send(result)
         return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
        
    }
}

export const getExerciseByID = async (req: Request, res: Response) => {  
    try {
        const result = await db.select().from(exercises).where(eq(exercises.exerciseId, parseInt(req.params.id)));
        res.status(200).send(result);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}