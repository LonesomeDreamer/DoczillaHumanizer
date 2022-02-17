import matchDetailed from "../util/matchDetailed";

const allUppercaseRegex = /^[A-Z]*$/;
const pascalCaseWordPartsRegex = /[A-Z]?[a-z]+|[0-9]+[a-z]*|[A-Z]+(?=[A-Z][a-z]|[0-9]|\b)/g;
const freestandingSpacingCharRegex = /\s[-_]|[-_]\s/;

function fromUnderscoreDashSeparatedWords(input: string) {
    return input.split(/[_-]/).join(" ");
}

function fromPascalCase(input: string) {
    const res = matchDetailed(input, pascalCaseWordPartsRegex).map(match =>
        allUppercaseRegex.test(match[0]) &&
        (match[0].length > 1 || (match.index > 0 && input[match.index - 1] === " ") || match[0] === "I") ?
            match[0] :
            match[0].toLowerCase()
    ).join(" ");

    return res.length > 0 ? res[0].toUpperCase() + res.slice(1) : res;
}

/**
 * Humanizes the input string; e.g.
 * `Underscored_input_String_is_turned_INTO_sentence` -> `'Underscored input String is turned INTO sentence'`
 * @param input The string to be humanized
 */
export default function humanizeString(input: string) {
    if (allUppercaseRegex.test(input)) return input;
    if (freestandingSpacingCharRegex.test(input)) return fromPascalCase(fromUnderscoreDashSeparatedWords(input));
    if (input.indexOf("_") > -1 || input.indexOf("-") > -1) return fromUnderscoreDashSeparatedWords(input);
    return fromPascalCase(input);
}
