import { Router } from 'express';
import { UserService } from 'src/service';
import { JwtStragy } from 'src/middleware/authguard/jwtstrategy';

const UserController: Router = Router();

UserController.get('/', async (_req, res) => {
    res.json(await UserService.getAll());
})

UserController.get('/:id', async (req, res) => {
    res.json(await UserService.getOneById(req.params.id));
})

export { UserController };