import ValueObject, {ValueObjectProps} from "../../valueObjects/ValueObject";

interface HashProps extends ValueObjectProps {
    hashedPassword: string
}

export interface IHashedPassword {
    toString(): string
}

export default class HashedPassword extends ValueObject<HashProps> implements IHashedPassword {

    constructor(protected readonly props: HashProps) {
        super(props);
    }

    public toString(): string {
        return this.props.hashedPassword;
    }

    public static fromString(hashedPassword: string): IHashedPassword {
        return new HashedPassword({hashedPassword});
    }

}
