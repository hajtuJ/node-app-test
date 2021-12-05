import {Request, Response} from "express";
import {route, GET, before} from "awilix-express";
import {Document, Model} from "mongoose";
import {IUser} from "../../models/User";
import { auth } from "./../../common/services/authenticate/strategies/jwt.strategy";

@route('/users')
class UserController {

    private readonly User;

    constructor({ User }: {User: Model<IUser & Document>}) {
        this.User = User;
    }

    @GET()
    @route('/')
    @before(auth)
    public async all(req: Request, res: Response): Promise<Response>
    {
        const users = await this.User.find({ limit: 10 }).exec();
        return res.json(users);
    }

    @GET()
    @route('/:uuid')
    public async user(req: Request, res: Response): Promise<Response>
    {
        const user = await this.User.findOne({ uuid: req.params.uuid });
        return res.json(user);
    }

}

export default UserController;
