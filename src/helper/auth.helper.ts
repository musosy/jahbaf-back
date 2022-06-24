import * as crypto from "crypto";
import { UserService } from "src/service";

export const AuthHelper = {
    formatEmail: (email: string): string => {
        return email.trim().toLocaleLowerCase();

    },
    isEmailValid: (email: string): boolean => {
        const emailExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailExpression.test(AuthHelper.formatEmail(email));
    },
    hash: (password: string): string => {
        return crypto.createHmac('sha256', password).digest('hex');
    },
    validate: async (email: string): Promise<any> => {
        return await UserService.getOneByEmail(email);
    }
};
