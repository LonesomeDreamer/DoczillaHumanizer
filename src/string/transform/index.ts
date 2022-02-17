import ToTitleCase from "./ToTitleCase";
import ToLowerCase from "./ToLowerCase";
import ToUpperCase from "./ToUpperCase";
import ToSentenceCase from "./ToSentenceCase";
import IStringTransformer from "./IStringTransformer";

/**
 * Transforms a string using the provided transformers. Transformations are applied in the provided order.
 * @param input
 * @param transformers
 */
export default function transform(input: string, ...transformers: IStringTransformer[]) {
    return transformers.reduce((curr, transformer) => transformer.transform(curr), input);
}

/**
 * Changes string to title case
 * @example "INvalid caSEs arE corrected" -> "Invalid Cases Are Corrected"
 */
export const toTitleCase = new ToTitleCase();

/**
 * Changes the string to lower case
 * @example "Sentence casing" -> "sentence casing"
 */
export const toLowerCase = new ToLowerCase();

/**
 * Changes the string to upper case
 * @example "lower case statement" -> "LOWER CASE STATEMENT"
 */
export const toUpperCase = new ToUpperCase();

/**
 * Changes the string to sentence case
 * @example "lower case statement" -> "Lower case statement"
 */
export const toSentenceCase = new ToSentenceCase();
