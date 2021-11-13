import {IPlainPassword} from "./PlainPassword";
import HashedPassword, {IHashedPassword} from "./HashedPassword";
import bcrypt from "bcryptjs";

export default class HashPasswordService {

    public static getHashedPassword (password: IPlainPassword): IHashedPassword {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password.toString(), salt);
            return HashedPassword.fromString(hash);
        }catch (e) {
            throw new Error("Can not hash password");
        }
    }

    public static validPassword(plainToCompare: IPlainPassword, hashedPassword: IHashedPassword): boolean
    {
        return bcrypt.compareSync(plainToCompare.toString(), hashedPassword.toString());
    }
}
