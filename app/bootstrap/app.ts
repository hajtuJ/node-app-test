require('dotenv').config();

import express, { NextFunction, Request, Response } from "express";
import {loadControllers, scopePerRequest} from "awilix-express";
import connect, { connectionConfig } from "./../database/connection";
import passport from "passport";
import strategies from "./../common/services/authenticate/strategies";
import container from "./container";

const app = express();

app.use(passport.initialize());

app.use(express.json());

app.use(scopePerRequest(container));

passport.use(strategies.jwtStrategy());

app.use(loadControllers("./../http/controllers/*.ts", {cwd: __dirname}));

app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    res.status(500)
    res.json({
        sratus: 500,
        error: err.message 
    });
});

connect(connectionConfig).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listning to requests on port ${process.env.PORT}`)
    });
});
