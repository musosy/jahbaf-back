import { UserLogin, UserNew, Token } from "src/interface";
import { JwtService } from "src/middleware/authguard/jwtservice";
import { UserService } from "./user.service";
import { AuthUtils } from "src/utils";
import { AuthHelper } from "src/helper";
import { MailService } from "./mail.service";

export const AuthService = {
    register: async (newUser: UserNew): Promise<any> => {

        newUser.password = AuthHelper.hash(newUser.password);
        newUser.email = AuthHelper.formatEmail(newUser.email);

        const isEmailTaken = await UserService.getOneByEmail(newUser.email);
        if (isEmailTaken) return { status: 204, message: "Email already taken" };

        const insertedUser = await UserService.insert(newUser);
        const payload = `${insertedUser.id}`;
        const token = AuthUtils.createToken(payload);
        console.log(token);
        const mailUrl = MailService.createMailingURL(token, "/confirmEmail");
        try {
            await MailService.sendConfirmationEmail(insertedUser.email, mailUrl);
        } catch (e: any) {
            await UserService.deleteOneById(insertedUser.id);
            return { status: e.code, message: e.response.body.errors[0].message };
        }

        return { status: 201, message: "Confirmation mail sent to " + insertedUser.email };
    },
    login: async (user: UserLogin): Promise<any> => {

        const userData = await AuthHelper.validate(AuthHelper.formatEmail(user.email));
        if (!userData || userData.password != AuthHelper.hash(user.password)) return { status: 404 };

        if (!userData.activated) return { status: 403, message: "User is not activated" };

        const payload = `${userData.id}`;
        const token = AuthUtils.createToken(payload);
        return {
          expires_in: 3600,
          access_token: token,
          user_id: payload,
          status: 200,
        };
    },
    logout: async (): Promise<any> => {
        // undefined
    },
    autoLogin: async (token: string): Promise<any> => {

        const isTokenValid = AuthUtils.getTokenPayload(token.split(' ')[1]);

        if (!isTokenValid) return { status: 404 };
        const { userId, expiresIn, emittedAt } = isTokenValid;

        const isExpired = AuthUtils.isTokenExpired(expiresIn, emittedAt);
        if (isExpired) throw new Error('Token expired');

        const user = await UserService.getOneById(userId);
        if (!user) return { status: 404, message: "User not found" };

        const payload = `${user.id}`;
        const newToken = AuthUtils.createToken(payload);

        return {
            expires_in: 3600,
            access_token: newToken,
            user_id: payload,
            status: 200,
        };
    },
    confirmAccount: async (token: string): Promise<string> => {
        const { userId, expiresIn, emittedAt } = AuthUtils.getTokenPayload(token);

        const isExpired = AuthUtils.isTokenExpired(expiresIn, emittedAt);
        if (isExpired) throw new Error('Token expired');

        const user = await UserService.getOneById(userId);
        if (!user) throw new Error('User could not be found');

        const updatedUser = await UserService.activateAccount(userId);
        if(!updatedUser) throw new Error('User could not be updated');

        return token;
    },
    resetPasswordMail: async (email: string) => {
        const user = await UserService.getOneByEmail(email);
        if (!user) return { status: 400, message: "User not found" };
        const token = AuthUtils.createToken(user.id);
        try {
            await MailService.sendResetPasswordEmail(email, MailService.createMailingURL(token, "reset-password"));
        } catch(e: any) {
            return { status: e.code, message: e.response.body.errors[0].message}
        }
        return { status: 200, message: "Email sent" };
    },
    resetPassword: async (token: string, password: string): Promise<string> => {
        try {
            const { userId, expiresIn, emittedAt } = AuthUtils.getTokenPayload(token);
            console.log({ userId, expiresIn, emittedAt })
            const isExpired = AuthUtils.isTokenExpired(expiresIn, emittedAt);
            if (isExpired) throw new Error('Token expired');
            const user = await UserService.getOneById(userId);
            if (!user) throw new Error('User could not be found');
            const hashedPassword = AuthHelper.hash(password);
            const updatedUser = await UserService.resetPassword(userId, hashedPassword);
            if(!updatedUser) throw new Error('User could not be updated');
            return token;
        } catch(e) {
            console.log(e);
            return "Something went wrong"
        }
    }
}