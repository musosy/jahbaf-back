import { UserLogin, UserNew } from "src/interface";
import { JwtService } from "src/middleware/authguard/jwtservice";
import * as crypto from 'crypto';
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

export const AuthService = {
    register: async (newUser: UserNew): Promise<any> => {
        newUser.password = AuthService.hash(newUser.password);
        const insertedUser = await UserService.insert(newUser);
        const payload = `${newUser.email}`;
        return {
            expires_in: 3600,
            access_token: JwtService.sign(payload),
            user_id: payload,
            status: 200,
        }
    },
    login: async (user: UserLogin): Promise<any> => {
        const userData = await AuthService.validate(user.email);
        if (!userData || userData.password != AuthService.hash(user.password)) return { status: 404 };
        const payload = `${userData.email}`;
        return {
          expires_in: 3600,
          access_token: JwtService.sign(payload),
          user_id: payload,
          status: 200,
        };
    },
    logout: async (): Promise<any> => {
        // undefined
    },
    autoLogin: async (token: string): Promise<any> => {
        const isTokenValid = JwtService.verify(token.split(' ')[1]);
        if (!isTokenValid) return { status: 404 };
        const userData = await AuthService.validate(isTokenValid);
        if (!userData) return { status: 404 };
        const payload = `${userData.email}`;
        return {
            expires_in: 3600,
            access_token: JwtService.sign(payload),
            user_id: payload,
            status: 200,
        };
    },
    hash: (password: string): string => {
        return crypto.createHmac('sha256', password).digest('hex');
    },
    validate: async (email: string): Promise<any> => {
        return await UserService.getOneByEmail(email);
    }
}