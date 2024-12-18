import { Request,Response } from "express";
import { db } from "../models/db";
import { records } from "../models/schema";
import { eq } from "drizzle-orm";

interface AuthRequest extends Request {
    user?: {
        id: number;
    }
}

export const getRecords = async (req: AuthRequest, res: Response) => {
    try{
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const result = await db.select().from(records).where(eq(records.userId, userId));
        res.status(200).send(result);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}   

export const getRecordsByID = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const { id } = req.params;
        const result = await db.select().from(records).where(eq(records.recordId, parseInt(id)));
        res.status(200).send(result);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const totalCaloriesBurned = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const result = await db.select({ 
            caloriesBurned: records.caloriesBurned 
        }).from(records).where(eq(records.userId, userId));
        const totalCaloriesBurned = result.reduce((sum, record) => sum + record.caloriesBurned, 0);
        res.status(200).json({ totalCaloriesBurned });
        
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}


