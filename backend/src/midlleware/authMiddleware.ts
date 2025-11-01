import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request{
    userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(403).json({message: "Access Denied. No token provided."})
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token as string, JWT_SECRET as string);

        req.userId = (decoded as jwt.JwtPayload).id as string;
        next();

    }catch(error){
        console.error("Auth middleware error: ",(error as Error).message);
        return res.status(403).json({message: "Invalid or expired token."});
    }
};