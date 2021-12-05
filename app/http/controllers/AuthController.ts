import { IUser } from './../../models/User';
import { UserProviderCredentials } from './../../common/services/authenticate/UserProvider';
import {route, POST} from "awilix-express";
import {IUserProvider} from "common/services/authenticate/UserProvider";
import {Request, Response} from "express";
import {Model} from "mongoose";
import container from "../../bootstrap/container";
import jwt from "jsonwebtoken";
import PlainPassword from './../../common/services/password/PlainPassword';
import { ParamsDictionary } from 'express-serve-static-core';
import HashPasswordService from './../../common/services/password/HashPasswordService';
import HashedPassword from './../../common/services/password/HashedPassword';


interface LoginParams extends ParamsDictionary {
    name: string,
    password: string
}

interface RegisterParams extends LoginParams {}
@route('/auth')
class AuthController {

    private readonly UserProvider;

    constructor({ userProvider }: {userProvider: IUserProvider}) {
        this.UserProvider = userProvider;
    }

    @POST()
    public async login(req: Request, res: Response): Promise<Response<JSON>>
    {
        const userCredentials: UserProviderCredentials =  {
            name: req.body.name
        }
        const user: IUser|null = await this.UserProvider.retriveByCredentials(userCredentials);

        if (!user) {
            throw new Error("User not exists");
        }

        const validation: boolean = HashPasswordService.validPassword(
            new PlainPassword({password: req.body.password}), 
            HashedPassword.fromString(user.password)
        );

        if (!validation) {
            throw new Error("User not exists. <password>");
        }
        
        const secret: string = process.env.JWT_SECRET ?? '';

        const token = jwt.sign({name: user.name}, secret, {
            issuer: 'accounts.examplesoft.com',
            audience: 'yoursite.net',
        });

        return res.json({ token });
    }

    @POST()
    @route('/register')
    public async register(req: Request<RegisterParams>, res: Response): Promise<Response<JSON>>
    {
        const existsingUser: IUser|null = await this.UserProvider.retriveByCredentials({
            name: req.body.name
        });

        if (existsingUser) {
            throw new Error("User already exists.");
        }

        const UserModel: Model<IUser> = container.resolve("User");

        const plainPassword: PlainPassword = new PlainPassword({ password: req.body.password });
        const hashedPassword = HashPasswordService.getHashedPassword(plainPassword);

        const user: IUser = await UserModel.create({
            name: req.body.name,
            password: hashedPassword.toString()
        });

        return res.json(user);
    }
}

export default AuthController;
