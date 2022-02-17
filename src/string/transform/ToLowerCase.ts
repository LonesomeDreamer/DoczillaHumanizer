import IStringTransformer from "./IStringTransformer";

export default class ToLowerCase implements IStringTransformer {
    transform(input: string): string {
        return input.toLowerCase();
    }
}
