import express, { json } from 'express';
import dotenv from 'dotenv';
import "reflect-metadata";
import { UserController } from './controller';
import { AuthController } from './controller/auth.controller';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 4000;

(() => {
    const app = express();
    app.use(cors());
    app.use(json());
    app.use("/api/auth", AuthController);
    app.use("/api/user", UserController);

    app.listen(PORT, () => console.log("Listening on port " + PORT));
})();
