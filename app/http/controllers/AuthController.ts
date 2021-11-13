import {route, POST} from "awilix-express";
import { IUserProvider } from "common/services/authenticate/UserProvider";
import {Request, Response} from "express";
import { Document, Model } from "mongoose";
import container from "../../bootstrap/container";
import {IUser} from "../../models/User";


@route('/auth')
class AuthController {

    private readonly UserProvider;

    // @ts-ignore
    constructor({ userProvider }: {userProvider: IUserProvider}) {
        this.UserProvider = userProvider;
    }

    @POST()
    public async login(req: Request, res: Response): Promise<Response<JSON>>
    {
        const user = await this.UserProvider.retriveByCredentials({name: req.body.name});
        return res.json(user);
    }

    @POST()
    @route('/register')
    public async register(req: Request, res: Response): Promise<Response<JSON>>
    {
        const UserModel: Model<IUser & Document> = container.resolve("User");
        const user: IUser = await UserModel.create(req.body);
        return res.json(user);
    }
}

export default AuthController;
