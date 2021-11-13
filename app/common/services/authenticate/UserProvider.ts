import {IUser} from "../../../models/User";
import {Document, Model, QueryWithHelpers} from "mongoose";

export interface UserProviderCredentials {
    name: string
}

export interface IUserProvider {
    retriveByCredentials: (credentials: UserProviderCredentials) => Promise<Document<IUser> | null>
}

export default class UserProvider implements IUserProvider{

    private readonly User;

    public constructor({ User }: { User: Model<IUser & Document> }) {
        this.User = User;
    }

    public async retriveByCredentials (credentials: UserProviderCredentials): Promise<Document<IUser>|null> {
        return await this.User.findOne({ name: credentials.name }).exec();
    }

}
