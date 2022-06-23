import express from 'express';
import dotenv from 'dotenv';
import "reflect-metadata";
import prisma from "./client";
import { UserController } from './controller';

dotenv.config();

const PORT = process.env.PORT || 4000;

(() => {
    const app = express();
    app.use("/api/user", UserController);

    app.listen(PORT, () => console.log("Listening on port " + PORT));
})();
