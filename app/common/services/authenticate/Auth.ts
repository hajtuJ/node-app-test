
import {IUserProvider, UserProviderCredentials} from "./UserProvider";
import {IUser} from "models/User";
import {Document} from "mongoose";

class Auth {

    private readonly UserProvider;

    private User: Document<IUser> | null = null;

    private isAuth: boolean = false;

    constructor({ userProvider }: {userProvider: IUserProvider}) {
        this.UserProvider = userProvider;
    }

    private async authenticate(credentials: UserProviderCredentials): Promise<void>
    {
        const user = await this.UserProvider.retriveByCredentials(credentials);
        if (null !== user) {
            this.setUser(user);
        }
    }

    private setUser(user: Document<IUser>): void 
    {
        this.isAuth = true;
        this.User = user;
    }

}