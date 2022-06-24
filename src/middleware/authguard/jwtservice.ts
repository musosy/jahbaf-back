import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtConstants } from './constant';

export const JwtService = {
    sign: (payload: string): string => {
        return jwt.sign(payload, jwtConstants.secret);
    },
    verify: (token: string): any => {
        return jwt.verify(token, jwtConstants.secret);
    }
}