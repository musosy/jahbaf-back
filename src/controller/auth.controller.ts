import { Request, Response, Router } from 'express';
import { UserLogin, UserNew } from 'src/interface';
import { JwtStragy } from 'src/middleware/authguard/jwtstrategy';
import { AuthService } from 'src/service';

const AuthController: Router = Router();

AuthController.post('/login', async (req: Request, _res: Response) => {
    const userLogin: UserLogin = req.body.user;
    return await AuthService.login(userLogin);
})

AuthController.post('/register', async (req: Request, _res: Response) => {
    const userNew: UserNew = await AuthService.register(req.body.user);
    return await AuthService.register(userNew);
})

AuthController.post('/logout', JwtStragy, async (_req: Request, _res: Response) => {
    return await AuthService.logout();
})

AuthController.post('/auto-login', async (req: Request, _res: Response) => {
    const token = req.headers.authorization ?? "";
    return await AuthService.autoLogin(token);
})
export { AuthController };