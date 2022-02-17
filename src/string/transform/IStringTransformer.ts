export default interface IStringTransformer {
    /**
     * Transform the input
     * @param input String to be transformed
     */
    transform(input: string): string;
}
