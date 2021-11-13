import {shallowEqual} from "shallow-equal-object";

export interface ValueObjectProps {
    readonly [index: string]: unknown
}

export default abstract class ValueObject<T extends ValueObjectProps> {

    constructor (protected readonly props: T) {
        this.props = Object.freeze(props);
    }

    public equals (vo: ValueObject<T>) : boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return shallowEqual(this.props, vo.props)
    }

}
