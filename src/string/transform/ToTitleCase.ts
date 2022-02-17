import IStringTransformer from "./IStringTransformer";
import matchDetailed from "../../util/matchDetailed";

const matchRegex = /(\w|[^\u0000-\u007F])+'?\w*/g;

export default class ToTitleCase implements IStringTransformer {
    private static allUppercaseRegex = /^[A-Z]*$/;

    private static allCapitals(input: string) {
        return this.allUppercaseRegex.test(input);
    }

    private static replaceWithTitleCase(word: RegExpExecArray, source: string) {
        const wordToConvert = word[0];
        const replacement = wordToConvert[0].toUpperCase() + wordToConvert.substring(1).toLowerCase();
        return source.substring(0, word.index) + replacement +
            source.substring(word.index + wordToConvert.length);
    }

    transform(input: string) {
        let result = input;
        const matches = matchDetailed(input, matchRegex);

        for (const match of matches) {
            if (!ToTitleCase.allCapitals(match[0])) result = ToTitleCase.replaceWithTitleCase(match, result);
        }

        return result;
    }
}
