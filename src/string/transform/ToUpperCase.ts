import IStringTransformer from "./IStringTransformer";

export default class ToUpperCase implements IStringTransformer {
    transform(input: string): string {
        return input.toUpperCase();
    }
}
