import {Request, Response} from "express";
import {route, GET, POST} from "awilix-express";

@route('/users')
class UserController {

    private readonly User;

    // @ts-ignore
    constructor({ User }) {
        this.User = User;
    }

    @GET()
    @route('/')
    public async all(req: Request, res: Response) {
        const users = await this.User.find({ limit: 10 }).exec();
        return res.json(users);
    }

    @GET()
    @route('/:uuid')
    public async user(req: Request, res: Response) {
        const user = await this.User.findOne({ uuid: req.params.uuid });
        return res.json(user);
    }

    @POST()
    @route('/')
    public async create(req: Request, res: Response) {
        // const user = await this.User.findOne({ uuid: req.params.uuid });
        return res.json(req.body);
    }

}

export default UserController;
