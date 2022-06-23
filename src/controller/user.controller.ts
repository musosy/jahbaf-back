import { Router } from 'express';
import { UserService } from 'src/service';

const UserController: Router = Router();

UserController.get('/', async (req, res) => {
    const response = await UserService.getAll();
    res.json(response);
})

UserController.get('/:id', async (req, res) => {
    const response = await UserService.getOneById(req.params.id);
    res.json(response);
})

export { UserController };