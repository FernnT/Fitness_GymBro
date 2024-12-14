import { Request,Response } from "express";
import { db } from "../models/db";
import { user } from "../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
interface AuthRequest extends Request {
    user?: {
        id: number;
    }
}

export const getUserByID = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const result = await db.select().from(user).where(eq(user.userId, userId));
        res.status(200).send(result);
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const updateUserPassword = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.update(user).set({ password: hashedPassword }).where(eq(user.userId, userId));
        res.status(200).send("User password updated successfully");
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

export const updateUserUsername = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const { username } = req.body;
        await db.update(user).set({ username }).where(eq(user.userId, userId));
        res.status(200).send("User username updated successfully");
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}   

export const updateUserHeightWeight = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send("User not authenticated");
            return;
        }
        const { height, weight } = req.body;
        await db.update(user).set({ height, weight }).where(eq(user.userId, userId));
        res.status(200).send("User height and weight updated successfully");
        return;
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}       
