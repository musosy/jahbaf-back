import jwt from 'jsonwebtoken';
import { jwtConstants } from "./constant";
import { Request, Response, NextFunction } from "express";

export const JwtStragy = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader: string | undefined = req.headers.authorization;
    if (authHeader) {
        const token: string = authHeader.split(' ')[1];
        jwt.verify(token, jwtConstants.secret, (err: any, user: any) => {
            if (err) return res.status(403);
            req.headers.user = user;
            next();
        });
    }
    return res.status(401);
}