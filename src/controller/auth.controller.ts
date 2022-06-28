import { Request, Response, Router } from 'express';
import { UserLogin, UserNew } from 'src/interface';
import { JwtStragy } from 'src/middleware/authguard/jwtstrategy';
import { AuthService } from 'src/service';

const AuthController: Router = Router();

AuthController.post('/login', async (req: Request, res: Response) => {
    res.json(await AuthService.login(req.body.user ?? {} as UserLogin));
})

AuthController.post('/register', async (req: Request, res: Response) => {
    res.json(await AuthService.register(req.body.user ?? {} as UserNew));
})

AuthController.post('/logout', JwtStragy, async (_req: Request, res: Response) => {
    res.json(await AuthService.logout());
})

AuthController.post('/auto-login', async (req: Request, res: Response) => {
    res.json(await AuthService.autoLogin(req.headers.authorization ?? ""));
})

AuthController.get('/confirm-account/:token', async (req: Request, res: Response) => {
    res.json(await AuthService.confirmAccount(req.params.token ?? ""));
})

AuthController.post('/reset-password-mail', async (req: Request, res: Response) => {
    res.json(await AuthService.resetPasswordMail(req.body.email));
})

AuthController.post('/reset-password/', async (req: Request, res: Response) => {
    res.json(await AuthService.resetPassword(req.body.data.token, req.body.data.password));
})

export { AuthController };