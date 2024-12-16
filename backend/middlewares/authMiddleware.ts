import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET; 

interface CustomRequest extends Request {
    user: string | JwtPayload
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
     res.status(401).send({ error: "Access denied. No token provided." });
     return
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as CustomRequest).user = decoded; 
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token." });
  }
};