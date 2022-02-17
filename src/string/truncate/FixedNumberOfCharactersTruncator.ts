import ITruncator from "./ITruncator";
import TruncateFrom from "./TruncateFrom";

const isLetterOrDigitRegex = /^[a-zA-Z0-9]/;
function isLetterOrDigit(v: string) {
    return isLetterOrDigitRegex.test(v);
}

export default class FixedNumberOfCharactersTruncator implements ITruncator {
    truncate(value: string, length: number, truncationString: string, from: TruncateFrom = TruncateFrom.End): string {
        if (value == null) return value;
        if (value.length === 0) return value;

        let alphanumericalCharactersProcessed = 0;

        if (value.split("")
            .reduce((prev, curr) => prev + (isLetterOrDigit(curr) ? 1 : 0), 0) <= length)
            return value;

        if (from === TruncateFrom.Start) {
            for (let i = value.length - 1; i > 0; i--) {
                if (isLetterOrDigit(value[i])) alphanumericalCharactersProcessed++;

                if (alphanumericalCharactersProcessed + truncationString.length === length)
                    return truncationString + value.substring(i);
            }
        }

        for (let i = 0; i < value.length - truncationString.length; i++) {
            if (isLetterOrDigit(value[i])) alphanumericalCharactersProcessed++;
            if (alphanumericalCharactersProcessed + truncationString.length === length)
                return value.substring(0, i + 1) + truncationString;
        }

        return value;
    }
}
