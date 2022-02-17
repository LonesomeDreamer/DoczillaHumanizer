import defaultVocabulary from "./defaultVocabulary";

/**
 * Pluralises the provided input considering irregular words
 * @param word Word to be pluralised
 * @param isKnownToBeSingular Normally you call `pluralize` on singular words, but if you're unsure set this to false
 */
export function pluralize(word: string, isKnownToBeSingular = true) {
    return defaultVocabulary.pluralize(word, isKnownToBeSingular);
}

/**
 * Singularises the provided input considering irregular words
 * @param word Word to be singularised
 * @param isKnownToBePlural Normally you call `singularize` on plural words, but if you're unsure set this to false
 * @param skipSimpleWords Skip singularising simple words that have an 's' on the end (assumes default vocabulary)
 */
export function singularize(word: string, isKnownToBePlural = true, skipSimpleWords = false) {
    return defaultVocabulary.singularize(word, isKnownToBePlural, skipSimpleWords);
}
