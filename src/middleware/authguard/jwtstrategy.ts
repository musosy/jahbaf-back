import jwt from 'jsonwebtoken';
import { jwtConstants } from "./constant";
import { Request, Response, NextFunction } from "express";

export const JwtStragy = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader: string | undefined = req.headers.authorization;
    if (authHeader) {
        const token: string = authHeader.split(' ')[1];
        return jwt.verify(token, jwtConstants.secret, (err: any) => {
            return err
                ? res.sendStatus(403)
                : next();
        });
    }
    return res.sendStatus(401);
}