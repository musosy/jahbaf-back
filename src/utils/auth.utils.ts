import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { Token } from "src/interface";
import { UserRepository } from "src/repository";
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export const AuthUtils = {
    isTokenExpired: (expiresIn: number, emittedAt: number) => {
        return Date.now() > expiresIn * 1000 + emittedAt;
    },
    generateTokenSettings: () =>  {
        return {
            expiresIn: ONE_WEEK_IN_SECONDS,
            emittedAt: Date.now(),
        };
    },
    createToken: (userId: string, tokenOptions: SignOptions = {}): string => {
        const tokenSettings = { ...AuthUtils.generateTokenSettings(), ...tokenOptions };
        return jwt.sign(
            {
                userId: userId,
                ...tokenSettings,
            },
            process.env.SECRET_KEY!
        );
    },
    getTokenPayload: (token: string): Token => {
        return jwt.verify(token, process.env.SECRET_KEY!) as Token;
    },
    getUserIdFromToken: async (req: Request, res: Response) => {
        const token = req.cookies.session_id;
        if (token) {
            const { userId, expiresIn, emittedAt } = AuthUtils.getTokenPayload(token);
            if (AuthUtils.isTokenExpired(expiresIn, emittedAt)) {
                res.clearCookie('session');
                console.warn('Session expired');
                throw new Error('Session expired');
            }
            const user = await UserRepository.findOneById(userId);
            if (!user) {
                res.clearCookie('session');
                console.warn('Session expired');
                throw new Error('Session expired');
            }
            return userId;
        }
        return '';
    }
}
