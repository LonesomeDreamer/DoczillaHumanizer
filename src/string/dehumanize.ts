import humanizeString from "./humanize";

/**
 * Dehumanises a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
 * @param input The string to be dehumanised
 */
export default function dehumanizeString(input: string) {
    if (input.indexOf(" ") === -1) return input;
    const titlisedWords = input.split(" ").map(word => humanizeString(word));
    return titlisedWords.join("").replace(/ /g, "");
}
