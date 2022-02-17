import ITruncator from "./ITruncator";
import TruncateFrom from "./TruncateFrom";

export default class FixedNumberOfWordsTruncator implements ITruncator {
    private static truncateFromStart(value: string, length: number, truncationString: string) {
        let lastCharacterWasWhitespace = true;
        let wordsProcessed = 0;

        for (let i = value.length - 1; i > 0; i--) {
            if (value[i].trim().length === 0) {
                if (!lastCharacterWasWhitespace) wordsProcessed++;
                lastCharacterWasWhitespace = true;

                if (wordsProcessed === length) return truncationString + value.substring(i + 1).trimEnd();
            } else {
                lastCharacterWasWhitespace = false;
            }
        }

        return truncationString + value;
    }

    private static truncateFromEnd(value: string, length: number, truncationString: string) {
        let lastCharacterWasWhitespace = true;
        let wordsProcessed = 0;

        for (let i = 0; i < value.length; i++) {
            if (value[i].trim().length === 0) {
                if (!lastCharacterWasWhitespace) wordsProcessed++;
                lastCharacterWasWhitespace = true;

                if (wordsProcessed === length) return value.substring(0, i) + truncationString;
            } else {
                lastCharacterWasWhitespace = false;
            }
        }

        return value + truncationString;
    }

    truncate(value: string, length: number, truncationString: string, from: TruncateFrom = TruncateFrom.End): string {
        if (value == null) return value;
        if (value.length === 0) return value;

        const wordCount = value.split(/\s+/).length;
        if (wordCount <= length) return value;

        return from === TruncateFrom.Start ?
            FixedNumberOfWordsTruncator.truncateFromStart(value, length, truncationString) :
            FixedNumberOfWordsTruncator.truncateFromEnd(value, length, truncationString);
    }
}
