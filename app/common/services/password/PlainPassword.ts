import ValueObject, {ValueObjectProps} from "../../valueObjects/ValueObject";

export interface PlainPasswordProps extends ValueObjectProps{
    password: string;
}

export interface IPlainPassword {
    toString(): string
}

export default class PlainPassword extends ValueObject<PlainPasswordProps> implements IPlainPassword
{

    public constructor(protected readonly props: PlainPasswordProps) {
        super(props);
    };

    public toString(): string {
        return this.props.password;
    }

    public static fromString(password: string): IPlainPassword {
        return new PlainPassword({password});
    }

}
