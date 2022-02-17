import TruncateFrom from "./TruncateFrom";

export default interface ITruncator {
    /**
     * Truncate a string
     * @param value The string to truncate
     * @param length The length to truncate to
     * @param truncationString The string used to truncate with
     * @param from Where to truncate the string
     */
    truncate(value: string, length: number, truncationString: string, from?: TruncateFrom): string;
}
