import { Schema, model, Document, Model } from "mongoose";
import {v4 as Uuid} from "uuid";

export const UserModelName: string = "User" as const;

export interface IUser extends Document {
    uuid: string;
    name: string;
    password: string;
    date: object;
}

const userSchema = new Schema<IUser & Document>({
    uuid:  {type: String, length: 32, required: true, default: Uuid()}, // String is shorthand for {type: String}
    name:  {type: String, required: true, index: {unique: true}}, // String is shorthand for {type: String}
    password:  {type: String, required: true, select: false}, // String is shorthand for {type: String}
    date: { type: Date, default: Date.now }
});

const userModel: Model<IUser> = model<IUser>(UserModelName, userSchema);

userModel.createIndexes();

export default userModel;