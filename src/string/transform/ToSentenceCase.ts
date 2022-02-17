import IStringTransformer from "./IStringTransformer";

export default class ToSentenceCase implements IStringTransformer {
    transform(input: string): string {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
}
