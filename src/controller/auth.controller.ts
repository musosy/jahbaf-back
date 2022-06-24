import { Request, Response, Router } from 'express';
import { UserLogin, UserNew } from 'src/interface';
import { JwtStragy } from 'src/middleware/authguard/jwtstrategy';
import { AuthService } from 'src/service';

const AuthController: Router = Router();

AuthController.post('/login', async (req: Request, res: Response) => {
    const userLogin: UserLogin = req.body.user;
    res.json(await AuthService.login(userLogin));
})

AuthController.post('/register', async (req: Request, res: Response) => {
    console.log(typeof req.body.user.password);
    res.json(await AuthService.register(req.body.user));
})

AuthController.post('/logout', JwtStragy, async (_req: Request, _res: Response) => {
    return await AuthService.logout();
})

AuthController.post('/auto-login', async (req: Request, res: Response) => {
    const token = req.headers.authorization ?? "";
    res.json(await AuthService.autoLogin(token));
})


export { AuthController };