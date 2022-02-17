import FixedLengthTruncator from "./FixedLengthTruncator";
import FixedNumberOfCharactersTruncator from "./FixedNumberOfCharactersTruncator";
import FixedNumberOfWordsTruncator from "./FixedNumberOfWordsTruncator";
import ITruncator from "./ITruncator";
import TruncateFrom from "./TruncateFrom";

/**
 * Truncate the string
 * @param input The string to be truncated
 * @param length The length to truncate to
 * @param truncationString The string used to truncate with, defaults to '…'. Null will use default
 * @param truncator The truncator to use
 * @param from - The end to be truncated
 */
export default function truncate(input: string, length: number, truncationString?: string,
                                 truncator: ITruncator = fixedLength, from = TruncateFrom.End) {
    if (truncationString == null) truncationString = "…";

    return truncator.truncate(input, length, truncationString, from);
}

/**
 * Fixed length truncator
 */
export const fixedLength = new FixedLengthTruncator();

/**
 * Fixed number of characters truncator
 */
export const fixedNumberOfCharacters = new FixedNumberOfCharactersTruncator();

/**
 * Fixed number of words truncator
 */
export const fixedNumberOfWords = new FixedNumberOfWordsTruncator();
