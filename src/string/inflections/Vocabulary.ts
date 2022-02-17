class Rule {
    public constructor(private readonly regex: RegExp, private readonly replacement: string) {}

    apply(word: string) {
        if (!this.regex.test(word)) return null;
        return word.replace(this.regex, this.replacement);
    }
}

export default class Vocabulary {
    private readonly plurals: Rule[] = [];
    private readonly singulars: Rule[] = [];
    private readonly uncountables: string[] = [];

    private isUncountable(word: string) {
        return this.uncountables.includes(word);
    }

    private applyRules(rules: Rule[], word: string, skipFirstRule: boolean) {
        if (word == null) return word;
        if (this.isUncountable(word)) return word;

        let result = word;
        const end = skipFirstRule ? 1 : 0;

        for (let i = rules.length - 1; i >= end; i--) {
            if ((result = rules[i].apply(word)) != null) break;
        }

        return result;
    }

    /**
     * Adds a word to the vocabulary which cannot easily be pluralised/singularised by regex
     * @param singular The singular form of the word
     * @param plural The plural form of the word
     * @param matchEnding True to match these words on their own as well as at the end of longer words
     */
    addIrregular(singular: string, plural: string, matchEnding = true) {
        if (matchEnding) {
            this.addPlural(`(${singular[0]})${singular.substring(1)}$`, "$1" + plural.substring(1));
            this.addSingular(`(${plural[0]})${plural.substring(1)}$`, "$1" + singular.substring(1));
        } else {
            this.addPlural(`^${singular}$`, plural);
            this.addSingular(`^${plural}$`, singular);
        }
    }

    /**
     * Adds an uncountable word to the vocabulary
     * @param word Word to be added to the list of uncountables
     */
    addUncountable(word: string) {
        this.uncountables.push(word);
    }

    /**
     * Adds a rule to the vocabulary that does not follow trivial rules for pluralisation
     * @param rule Regex to be matched. If it is a string it will be converted with `i` flag
     * @param replacement Regex replacement
     */
    addPlural(rule: RegExp | string, replacement: string) {
        if (typeof rule === "string") rule = new RegExp(rule, "i");
        this.plurals.push(new Rule(rule, replacement));
    }

    /**
     * Adds a rule to the vocabulary that does not follow trivial rules for singularisation
     * @param rule Regex to be matched. If it is a string it will be converted with `i` flag
     * @param replacement Regex replacement
     */
    addSingular(rule: RegExp | string, replacement: string) {
        if (typeof rule === "string") rule = new RegExp(rule, "i");
        this.singulars.push(new Rule(rule, replacement));
    }

    /**
     * Pluralises the provided input considering irregular words
     * @param word Word to be pluralised
     * @param inputIsKnownToBeSingular Normally you call `pluralize` on singular words, but if you're unsure set this to false
     */
    pluralize(word: string, inputIsKnownToBeSingular = true) {
        const result = this.applyRules(this.plurals, word, false);
        if (inputIsKnownToBeSingular) return result ?? word;

        const asSingular = this.applyRules(this.singulars, word, false);
        const asSingularAsPlural = this.applyRules(this.plurals, asSingular, false);
        if (asSingular != null && asSingular !== word && asSingular + "s" !== word && asSingularAsPlural === word && result !== word)
            return word;

        return result;
    }

    /**
     * Singularises the provided input considering irregular words
     * @param word Word to be singularised
     * @param inputIsKnownToBePlural Normally you call `singularize` on plural words, but if you're unsure set this to false
     * @param skipSimpleWords Skip singularising simple words that have an 's' on the end (assumes default vocabulary)
     */
    singularize(word: string, inputIsKnownToBePlural = true, skipSimpleWords = false) {
        const result = this.applyRules(this.singulars, word, skipSimpleWords);
        if (inputIsKnownToBePlural) return result ?? word;

        const asPlural = this.applyRules(this.plurals, word, false);
        const asPluralAsSingular = this.applyRules(this.singulars, asPlural, false);
        if (asPlural !== word && word + "s" !== asPlural && asPluralAsSingular === word && result !== word)
            return word;

        return result;
    }
}
