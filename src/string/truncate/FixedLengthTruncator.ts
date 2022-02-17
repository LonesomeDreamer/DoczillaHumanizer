import ITruncator from "./ITruncator";
import TruncateFrom from "./TruncateFrom";

export default class FixedLengthTruncator implements ITruncator {
    truncate(value: string, length: number, truncationString: string, from: TruncateFrom = TruncateFrom.End): string {
        if (value == null) return value;
        if (value.length === 0) return value;

        if (truncationString == null || truncationString.length > length) {
            return from === TruncateFrom.End ?
                value.substring(0, length) :
                value.substring(value.length - length);
        }

        if (from === TruncateFrom.Start) {
            return value.length > length ?
                truncationString + value.substring(value.length - length + truncationString.length) :
                value;
        }

        return value.length > length ?
            value.substring(0, length - truncationString.length) + truncationString :
            value;
    }
}
