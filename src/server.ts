import express from 'express';
import dotenv from 'dotenv';
import "reflect-metadata";

dotenv.config();

const PORT = process.env.PORT || 4000;

(() => {
    const app = express();

    app.listen(PORT, () => console.log("Listening on port " + PORT));
})();
