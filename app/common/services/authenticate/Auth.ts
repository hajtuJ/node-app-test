import {IUser} from "models/User";

export default class Auth {


    private User: IUser | null = null;

    constructor(user: IUser | null) {
        if (user) {
            this.setUser(user);
        }
    }

    public auth(): boolean
    {
        return !!this.User;
    }

    private setUser(user: IUser): void 
    {
        this.User = user;
    }

    public getID(): string | null
    {
        return this.User?.id;
    }

}