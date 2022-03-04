import {default as HumanizerSpellResult} from "../util/HumanizerSpellResult";
import {default as BigDecimal} from "./BigDecimal"

export default class HumanizerNumberSpeller {
	static plurals: {regex: RegExp, replacement: string}[] = [
		{ regex: /$/, replacement: "s" },
		{ regex: /s$/, replacement: "s" },
		{ regex: /(ax|test)is$/, replacement: "$1es" },
		{ regex: /(octop|vir|alumn|fung|cact|foc|hippopotam|radi|stimul|syllab|nucle)us$/, replacement: "$1i" },
		{ regex: /(alias|bias|iris|status|campus|apparatus|virus|walrus|trellis)$/, replacement: "$1es" },
		{ regex: /(buffal|tomat|volcan|ech|embarg|her|mosquit|potat|torped|vet)o$/, replacement: "$1oes" },
		{ regex: /([dti])um$/, replacement: "$1a" },
		{ regex: /sis$/, replacement: "ses" },
		{ regex: /(?:([^f])fe|([lr])f)$/, replacement: "$1$2ves" },
		{ regex: /(hive)$/, replacement: "$1s" },
		{ regex: /([^aeiouy]|qu)y$/, replacement: "$1ies" },
		{ regex: /(x|ch|ss|sh)$/, replacement: "$1es" },
		{ regex: /(matr|vert|ind|d)(ix|ex)$/, replacement: "$1ices" },
		{ regex: /(^[m|l])ouse$/, replacement: "$1ice" },
		{ regex: /^(ox)$/, replacement: "$1en" },
		{ regex: /(quiz)$/, replacement: "$1zes" },
		{ regex: /(buz|blit|walt)z$/, replacement: "$1zes" },
		{ regex: /(hoo|lea|loa|thie)f$/, replacement: "$1ves" },
		{ regex: /(alumn|alg|larv|vertebr)a$/, replacement: "$1ae" },
		{ regex: /(criteri|phenomen)on$/, replacement: "$1a" },
		{ regex: /(p)erson$/, replacement: "$1eople" },
		{ regex: /(m)an$/, replacement: "$1en" },
		{ regex: /(h)uman$/, replacement: "$1umans" },
		{ regex: /(c)hild$/, replacement: "$1hildren" },
		{ regex: /(s)ex$/, replacement: "$1exes" },
		{ regex: /(g)love$/, replacement: "$1loves" },
		{ regex: /(m)ove$/, replacement: "$1oves" },
		{ regex: /(g)oose$/, replacement: "$1eese" },
		{ regex: /(w)ave$/, replacement: "$1aves" },
		{ regex: /(f)oot$/, replacement: "$1eet" },
		{ regex: /(t)ooth$/, replacement: "$1eeth" },
		{ regex: /(c)urriculum$/, replacement: "$1urricula" },
		{ regex: /(d)atabase$/, replacement: "$1atabases" },
		{ regex: /(z)ombie$/, replacement: "$1ombies" },
		{ regex: /(p)ersonnel$/, replacement: "$1ersonnel" },
		{ regex: /(c)ache$/, replacement: "$1aches" },
		{ regex: /^ex$/, replacement: "exes" },
		{ regex: /^is$/, replacement: "are" },
		{ regex: /^that$/, replacement: "those" },
		{ regex: /^this$/, replacement: "these" },
		{ regex: /^bus$/, replacement: "buses" },
		{ regex: /^die$/, replacement: "dice" },
		{ regex: /^tie$/, replacement: "ties" },
	]

	static singulars: {regex: RegExp, replacement: string}[] = [
		{ regex: /s$/, replacement: "" },
		{ regex: /(n)ews$/, replacement: "$1ews" },
		{ regex: /([dti])a$/, replacement: "$1um" },
		{ regex: /(analy|ba|diagno|parenthe|progno|synop|the|ellip|empha|neuro|oa|paraly)ses$/, replacement: "$1sis" },
		{ regex: /([^f])ves$/, replacement: "$1fe" },
		{ regex: /(hive)s$/, replacement: "$1" },
		{ regex: /(tive)s$/, replacement: "$1" },
		{ regex: /([lr]|hoo|lea|loa|thie)ves$/, replacement: "$1f" },
		{ regex: /(^zomb)?([^aeiouy]|qu)ies$/, replacement: "$2y" },
		{ regex: /(s)eries$/, replacement: "$1eries" },
		{ regex: /(m)ovies$/, replacement: "$1ovie" },
		{ regex: /(x|ch|ss|sh)es$/, replacement: "$1" },
		{ regex: /(^[m|l])ice$/, replacement: "$1ouse" },
		{ regex: /(?<!^[a-z])(o)es$/, replacement: "$1" },
		{ regex: /(shoe)s$/, replacement: "$1" },
		{ regex: /(cris|ax|test)es$/, replacement: "$1is" },
		{ regex: /(octop|vir|alumn|fung|cact|foc|hippopotam|radi|stimul|syllab|nucle)i$/, replacement: "$1us" },
		{ regex: /(alias|bias|iris|status|campus|apparatus|virus|walrus|trellis)es$/, replacement: "$1" },
		{ regex: /^(ox)en/, replacement: "$1" },
		{ regex: /(matr|d)ices$/, replacement: "$1ix" },
		{ regex: /(vert|ind)ices$/, replacement: "$1ex" },
		{ regex: /(quiz)zes$/, replacement: "$1" },
		{ regex: /(buz|blit|walt)zes$/, replacement: "$1z" },
		{ regex: /(alumn|alg|larv|vertebr)ae$/, replacement: "$1a" },
		{ regex: /(criteri|phenomen)a$/, replacement: "$1on" },
		{ regex: /([b|r|c]ook|room|smooth)ies$/, replacement: "$1ie" },
		{ regex: /(p)eople$/, replacement: "$1erson" },
		{ regex: /(m)en$/, replacement: "$1an" },
		{ regex: /(h)umans$/, replacement: "$1uman" },
		{ regex: /(c)hildren$/, replacement: "$1hild" },
		{ regex: /(s)exes$/, replacement: "$1ex" },
		{ regex: /(g)loves$/, replacement: "$1love" },
		{ regex: /(m)oves$/, replacement: "$1ove" },
		{ regex: /(g)eese$/, replacement: "$1oose" },
		{ regex: /(w)aves$/, replacement: "$1ave" },
		{ regex: /(f)eet$/, replacement: "$1oot" },
		{ regex: /(t)eeth$/, replacement: "$1ooth" },
		{ regex: /(c)urricula$/, replacement: "$1urriculum" },
		{ regex: /(d)atabases$/, replacement: "$1atabase" },
		{ regex: /(z)ombies$/, replacement: "$1ombie" },
		{ regex: /(p)ersonnel$/, replacement: "$1ersonnel" },
		{ regex: /(c)aches$/, replacement: "$1ache" },
		{ regex: /^exes$/, replacement: "ex" },
		{ regex: /^are$/, replacement: "is" },
		{ regex: /^those$/, replacement: "that" },
		{ regex: /^these$/, replacement: "this" },
		{ regex: /^buses$/, replacement: "bus" },
		{ regex: /^dice$/, replacement: "die" },
		{ regex: /^ties$/, replacement: "tie" },
	]

	static uncountables = {
		"staff": true,
		"training": true,
		"equipment": true,
		"information": true,
		"corn": true,
		"milk": true,
		"rice": true,
		"money": true,
		"species": true,
		"series": true,
		"fish": true,
		"sheep": true,
		"deer": true,
		"aircraft": true,
		"oz": true,
		"tsp": true,
		"tbsp": true,
		"ml": true,
		"l": true,
		"water": true,
		"waters": true,
		"semen": true,
		"sperm": true,
		"bison": true,
		"grass": true,
		"hair": true,
		"mud": true,
		"elk": true,
		"luggage": true,
		"moose": true,
		"offspring": true,
		"salmon": true,
		"shrimp": true,
		"someone": true,
		"swine": true,
		"trout": true,
		"tuna": true,
		"corps": true,
		"scissors": true,
		"means": true,
		"mail": true,
		"metadata": true,
	}

	static ordinalExceptions = {
		1: "first",
		2: "second",
		3: "third",
		5: "fifth",
		8: "eighth",
		9: "ninth",
		12: "twelfth"
	}

	static unitsMap = [
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"twelve",
		"thirteen",
		"fourteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen"
	]

	static tensMap = [
		"zero",
		"ten",
		"twenty",
		"thirty",
		"forty",
		"fifty",
		"sixty",
		"seventy",
		"eighty",
		"ninety"
	]

	static getUnitValue(number: number, ordinal: boolean) {
		const ordinalExceptions = this.ordinalExceptions;
		const unitsMap = this.unitsMap;
		if (ordinal) {
			if (number in ordinalExceptions) return ordinalExceptions[number as keyof typeof ordinalExceptions];
			return unitsMap[number] + "th";
		}

		return unitsMap[number];
	}

	static removeOnePrefix(words: string) {
		if (words.indexOf("one") == 0) return words.substring(4);
		return words;
	}

	static isUncountable(unit: string): boolean {
		return this.uncountables[unit.toLowerCase() as keyof {}];
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

		if (this.isUncountable(unit)) {
			return unit;
		}

		var result: string = unit;
		var end: number = 0;

		for (var i: number = rules.length - 1; i >= end; i--) {
			if ((result = this.apply(rules[i], unit)) != null) {
				break;
			}
		}
		return result != null ? this.matchUpperCase(unit, result) : result;
	}

	static singularize(word: string): string {
		var result: string = this.applyRules(this.singulars, word);
		var asPlural: string = this.applyRules(this.plurals, word);
		var asPluralAsSingular: string = this.applyRules(this.singulars, asPlural);
		if ((asPlural != word) && ((word + "s") != asPlural) && (asPluralAsSingular == word) && (result != word)) {
			return word;
		}

		return result ? result : word;
	}

	static pluralize(word: string): string {
		var result: string = this.applyRules(this.plurals, word);
		var asSingular: string = this.applyRules(this.singulars, word);
		var asSingularAsPlural: string = this.applyRules(this.plurals, asSingular);
		if ((asSingular != null) && (asSingular != word) && ((asSingular + "s") != word) && (asSingularAsPlural == word) && (result != word))
		{
			return word;
		}

		return result;
	}

	static spellUnit(number: any, unit: string): string {
		return parseInt(number) == 1 ? this.singularize(unit) : this.pluralize(unit);
	}

	static parseNumber(number: any, ordinal?: boolean): string {
		var signum = number.signum();
		if (signum === 0) return this.getUnitValue(0, ordinal);
		if (signum < 0) return "minus " + this.parseNumber(number.negate());

		const parts: string[] = [];
		var newInteger: BigDecimal = null;

		if (number.getActualIntegerLength() >= 19) {
			number = number.shiftLeft(18);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " quintillion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 16) {
			number = number.shiftLeft(15);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " quadrillion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 13) {
			number = number.shiftLeft(12);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " trillion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 10) {
			number = number.shiftLeft(9);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " billion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 7) {
			number = number.shiftLeft(6);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " million");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 4) {
			number = number.shiftLeft(3);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " thousand");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 3) {
			newInteger = number.integer();
			newInteger = newInteger.shiftLeft(2);
			if (newInteger.getActualInt() != 0) {
				parts.push(this.parseNumber(newInteger) + " hundred");
			}
			number = newInteger.removeExponent().shiftLeft(1);
		}

		number = number.getActualInt();
		if (number > 0) {
			if (parts.length !== 0) parts.push("and");

			if (number < 20) parts.push(this.getUnitValue(number, ordinal));
			else {
				let lastPart = this.tensMap[Math.floor(number / 10)];
				if (number % 10 > 0) lastPart += "-" + this.getUnitValue(number % 10, ordinal);
				else if (ordinal) lastPart = lastPart.replace(/y$/, "") + "ieth";
				parts.push(lastPart);
			}
		} else if (ordinal) parts[parts.length - 1] += "th";

		let toWords = parts.join(" ");
		if (ordinal) toWords = this.removeOnePrefix(toWords);
		return toWords.trim();
	}

	static spellNumber(number: number | string, ordinal?: boolean): string {
		if (ordinal == null) {
			ordinal = false;
		}
		var bigDecimal: BigDecimal = new BigDecimal(number);
		var integerPart: BigDecimal = bigDecimal.integer();
		if (bigDecimal.signum() < 0) {
			integerPart.negate();
			ordinal = false;
		}

		var toWords: string = this.parseNumber(integerPart, ordinal);

		if (!ordinal) {
			var remainderPart: BigDecimal | string = bigDecimal.remainder();
			if (remainderPart.signum() != 0) {
				remainderPart = remainderPart.getStringifiedRemainder();
				var remainderPartLength: number = remainderPart.length;
				toWords = toWords.concat(" point");
				for (var i: number = 0; i < remainderPartLength; i++) {
					toWords = toWords.concat(" ", this.getUnitValue(parseInt(remainderPart[i]), false));
				}
			}
		}

		return toWords;
	}

	static spell(number: number | string, unit?: string, ordinal?: boolean): HumanizerSpellResult {
		unit = unit != null ? this.spellUnit(number, unit) : null;
		number = this.spellNumber(number, ordinal);
		return new HumanizerSpellResult(number, unit);
	}

	spell(number: number | string, unit?: string, ordinal?: boolean): HumanizerSpellResult {
		return HumanizerNumberSpeller.spell(number, unit, ordinal);
	}
}
