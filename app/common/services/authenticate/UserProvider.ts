import {IUser} from "../../../models/User";
import {Document, QueryWithHelpers} from "mongoose";

export interface UserProviderCredentials {
    name: string
}

export default class UserProvider {

    private readonly User;

    public constructor({ User }: { User:  QueryWithHelpers<IUser, Document> }) {
        this.User = User;
    }

    public async retriveByCredentials (credentials: UserProviderCredentials) {
        return await this.User.findOne({ name: credentials.name }).exec();
    }

}
