import {default as HumanizerSpellResult} from "../util";
import {default as BigDecimal} from "./BigDecimal"
import {EnglishNumberToWordsConverter} from "../localisation"
import {GermanNumberToWordsConverter} from "../localisation"

export default class HumanizerNumberSpeller {
	static isUncountable(unit: string): boolean {
		return EnglishNumberToWordsConverter.uncountables[unit.toLowerCase() as keyof {}];
	}

	static matchUpperCase(unit: string, replacement: string): string {
		return (unit[0] == unit[0].toUpperCase()) && (replacement[0] == replacement[0].toLowerCase()) ? replacement[0].toUpperCase() + replacement.slice(1) : replacement;
	}

	static apply(rule: {regex: RegExp, replacement: string}, unit: string): string {
		var regex: RegExp = rule.regex;
		var replacement: string = rule.replacement;
		if (unit.match(regex) == null) {
			return null;
		}

		return unit.replace(regex, replacement);
	}

	static applyRules(rules: {regex: RegExp, replacement: string}[], unit: string): string {
		if (unit == null) {
			return null;
		}

		if (unit.length < 1) {
			return unit;
		}

		var result: string = unit;
		var singulars = EnglishNumberToWordsConverter.singulars;

		for (var i: number = singulars.length - 1; i >= 0; i--) {
			if ((result = this.apply(singulars[i], unit)) != null) {
				break;
			}
		}

		result = result == null ? unit : result;

		if (this.isUncountable(result)) {
			return result;
		}

		if (rules != singulars) {
			for (var i: number = rules.length - 1; i >= 0; i--) {
				if ((result = this.apply(rules[i], unit)) != null) {
					break;
				}
			}
		}

		return result != null ? this.matchUpperCase(unit, result) : result;
	}

	static parseComplexWords(word: string): string[] {
		var complexWords = EnglishNumberToWordsConverter.complexWords;
		var result: RegExpMatchArray = null;
		for (var i: number = complexWords.length - 1; i >= 0; i--) {
			if ((result = word.match(complexWords[i])) != null) {
				return [result[1], result[2]];
			}
		}
		return [word, ""];
	}

	static singularize(word: string): string {
		var rest: string = "";
		[word, rest] = this.parseComplexWords(word);
		var singulars: {regex: RegExp, replacement: string}[] = EnglishNumberToWordsConverter.singulars;
		var result: string = this.applyRules(singulars, word);
		var asPlural: string = this.applyRules(EnglishNumberToWordsConverter.plurals, word);
		var asPluralAsSingular: string = this.applyRules(singulars, asPlural);
		if ((asPlural != word) && ((word + "s") != asPlural) && (asPluralAsSingular == word) && (result != word)) {
			return word.concat(rest);
		}

		return result ? result.concat(rest) : word.concat(rest);
	}

	static pluralize(word: string): string {
		var rest: string = "";
		[word, rest] = this.parseComplexWords(word);
		var plurals: {regex: RegExp, replacement: string}[] = EnglishNumberToWordsConverter.plurals;
		var result: string = this.applyRules(plurals, word);
		var asSingular: string = this.applyRules(EnglishNumberToWordsConverter.singulars, word);
		var asSingularAsPlural: string = this.applyRules(plurals, asSingular);
		if ((asSingular != null) && (asSingular != word) && ((asSingular + "s") != word) && (asSingularAsPlural == word) && (result != word))
		{
			return word.concat(rest);
		}

		return result.concat(rest);
	}

	static spellUnit(number: any, unit: string): string {
		return parseInt(number) == 1 ? this.singularize(unit) : this.pluralize(unit);
	}

	static spellNumber(number: number | string, ordinal?: boolean, locale?: string): {number: string, ordinal: boolean} {
		if (ordinal == null) {
			ordinal = false;
		}
		var bigDecimal: BigDecimal = new BigDecimal(number);
		var integerPart: BigDecimal = bigDecimal.integer();
		var signum: number = bigDecimal.signum();
		if (signum < 0) {
			integerPart.negate();
			ordinal = false;
		}

		var cultureClass: any = locale == "de-DE" ? GermanNumberToWordsConverter : EnglishNumberToWordsConverter;

		var toWords: string = cultureClass.parseNumber(integerPart, ordinal);

		if (!ordinal) {
			var remainderPart: BigDecimal | string = bigDecimal.remainder();
			if (remainderPart.signum() != 0) {
				remainderPart = remainderPart.getStringifiedRemainder();
				var remainderPartLength: number = remainderPart.length;
				toWords = toWords.concat(" ", cultureClass.getDelimeter());
				for (var i: number = 0; i < remainderPartLength; i++) {
					toWords = toWords.concat(" ", cultureClass.getUnitValue(parseInt(remainderPart[i]), false));
				}
			}
		}

		return {number: toWords, ordinal: ordinal};
	}

	static spell(number: number | string, unit?: string, ordinal?: boolean, locale?: string): HumanizerSpellResult {
		var spelledNumber: string = null;
		var result: {number: string, ordinal: boolean} = this.spellNumber(number, ordinal, locale);
		spelledNumber = result.number;
		ordinal = result.ordinal;
		if ((!ordinal) && (unit != null)) {
			unit = this.spellUnit(number, unit);
		}
		return new HumanizerSpellResult(spelledNumber, unit);
	}

	spell(number: number | string, unit?: string, ordinal?: boolean, locale?: string): HumanizerSpellResult {
		return HumanizerNumberSpeller.spell(number, unit, ordinal, locale);
	}
}
