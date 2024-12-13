import { Request,Response } from "express";
import {db} from '../models/db';
import { exercises } from "../models/schema";

export const getExercises = async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(exercises);
         res.status(200).send(result)
         return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
        
    }
}

export const getExerciseByID = (req: Request, res: Response) => {  
        
}