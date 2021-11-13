import {route, POST} from "awilix-express";
import {Request, Response} from "express";
import container from "../../bootstrap/container";


@route('/auth')
class AuthController {

    @POST()
    public async login(req: Request, res: Response) {
        const up = container.resolve('userProvider');
        const user = await up.retriveByCredentials({name: req.body.name});
        return res.json(user);
    }
}

export default AuthController;
