require('dotenv').config()

import express from "express";
import {loadControllers, scopePerRequest} from "awilix-express";
import connect, { connectionConfig } from "./../database/connection";

import container from "./container";
const app = express();

app.use(express.json());

app.use(scopePerRequest(container))

app.use(loadControllers("./../http/controllers/*.ts", {cwd: __dirname}));

connect(connectionConfig).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listning to requests on port ${process.env.PORT}`)
    });
});
