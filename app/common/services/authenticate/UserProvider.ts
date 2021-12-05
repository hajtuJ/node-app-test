import {IUser} from "../../../models/User";
import {Model} from "mongoose";
import PlainPassword from "../password/PlainPassword";

export interface UserProviderCredentials {
    name: string
};

export type UserToken = {
    value: string
}

export interface IUserProvider {
    retriveByCredentials: (credentials: UserProviderCredentials) => Promise<IUser|null> ,
    retriveByToken: (token: UserToken) => Promise<IUser|null> 
}

interface IUserProviderDep {
    User: Model<IUser>
}

export default class UserProvider implements IUserProvider{

    private readonly User: Model<IUser>;


    public constructor({ User }: IUserProviderDep) {
        this.User = User;
    }

    public async retriveByCredentials(credentials: UserProviderCredentials): Promise<IUser|null> 
    {
        return await this.User.findOne({ name: credentials.name }).select("+password").exec();
    }

    public async retriveByToken(token: UserToken): Promise<IUser|null> 
    {
        return this.User.findOne({ token: token.value }).exec();
    }

}
