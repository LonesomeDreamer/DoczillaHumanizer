import {default as BigDecimal} from "../number/BigDecimal"

export default class EnglishNumberToWordsConverter {
	static singulars: {regex: RegExp, replacement: string}[] = [
		{ regex: /s$/i, replacement: "" },
		{ regex: /(n)ews$/i, replacement: "$1ews" },
		{ regex: /([dti])a$/i, replacement: "$1um" },
		{ regex: /(analy|ba|diagno|parenthe|progno|synop|the|ellip|empha|neuro|oa|paraly)ses$/i, replacement: "$1sis" },
		{ regex: /([^f])ves$/i, replacement: "$1fe" },
		{ regex: /(hive)s$/i, replacement: "$1" },
		{ regex: /(tive)s$/i, replacement: "$1" },
		{ regex: /([lr]|hoo|lea|loa|thie)ves$/i, replacement: "$1f" },
		{ regex: /(^zomb)?([^aeiouy]|qu)ies$/i, replacement: "$2y" },
		{ regex: /(s)eries$/i, replacement: "$1eries" },
		{ regex: /(m)ovies$/i, replacement: "$1ovie" },
		{ regex: /(x|ch|ss|sh)es$/i, replacement: "$1" },
		{ regex: /(^[m|l])ice$/i, replacement: "$1ouse" },
		{ regex: /(?<!^[a-z])(o)es$/i, replacement: "$1" },
		{ regex: /(shoe)s$/i, replacement: "$1" },
		{ regex: /(cris|ax|test)es$/i, replacement: "$1is" },
		{ regex: /(octop|vir|alumn|fung|cact|foc|hippopotam|radi|stimul|syllab|nucle)i$/i, replacement: "$1us" },
		{ regex: /(alias|bias|iris|status|campus|apparatus|virus|walrus|trellis)es$/i, replacement: "$1" },
		{ regex: /^(ox)en/i, replacement: "$1" },
		{ regex: /(matr|d)ices$/i, replacement: "$1ix" },
		{ regex: /(vert|ind)ices$/i, replacement: "$1ex" },
		{ regex: /(quiz)zes$/i, replacement: "$1" },
		{ regex: /(buz|blit|walt)zes$/i, replacement: "$1z" },
		{ regex: /(alumn|alg|larv|vertebr)ae$/i, replacement: "$1a" },
		{ regex: /(criteri|phenomen)a$/i, replacement: "$1on" },
		{ regex: /([b|r|c]ook|room|smooth)ies$/i, replacement: "$1ie" },
		{ regex: /(p)eople$/i, replacement: "$1erson" },
		{ regex: /(m)en$/i, replacement: "$1an" },
		{ regex: /(h)umans$/i, replacement: "$1uman" },
		{ regex: /(c)hildren$/i, replacement: "$1hild" },
		{ regex: /(s)exes$/i, replacement: "$1ex" },
		{ regex: /(g)loves$/i, replacement: "$1love" },
		{ regex: /(m)oves$/i, replacement: "$1ove" },
		{ regex: /(g)eese$/i, replacement: "$1oose" },
		{ regex: /(w)aves$/i, replacement: "$1ave" },
		{ regex: /(f)eet$/i, replacement: "$1oot" },
		{ regex: /(t)eeth$/i, replacement: "$1ooth" },
		{ regex: /(c)urricula$/i, replacement: "$1urriculum" },
		{ regex: /(d)atabases$/i, replacement: "$1atabase" },
		{ regex: /(z)ombies$/i, replacement: "$1ombie" },
		{ regex: /(p)ersonnel$/i, replacement: "$1ersonnel" },
		{ regex: /(c)aches$/i, replacement: "$1ache" },
		{ regex: /^exes$/i, replacement: "ex" },
		{ regex: /^are$/i, replacement: "is" },
		{ regex: /^those$/i, replacement: "that" },
		{ regex: /^these$/i, replacement: "this" },
		{ regex: /^buses$/i, replacement: "bus" },
		{ regex: /^dice$/i, replacement: "die" },
		{ regex: /^ties$/i, replacement: "tie" },
		{ regex: /^(passer)sby$/i, replacement: "$1by" },
	]

	static plurals: {regex: RegExp, replacement: string}[] = [
		{ regex: /$/i, replacement: "s" },
		{ regex: /s$/i, replacement: "s" },
		{ regex: /(ax|test)is$/i, replacement: "$1es" },
		{ regex: /(octop|vir|alumn|fung|cact|foc|hippopotam|radi|stimul|syllab|nucle)us$/i, replacement: "$1i" },
		{ regex: /(alias|bias|iris|status|campus|apparatus|virus|walrus|trellis)$/i, replacement: "$1es" },
		{ regex: /(buffal|tomat|volcan|ech|embarg|her|mosquit|potat|torped|vet)o$/i, replacement: "$1oes" },
		{ regex: /([dti])um$/i, replacement: "$1a" },
		{ regex: /sis$/i, replacement: "ses" },
		{ regex: /(?:([^f])fe|([lr])f)$/i, replacement: "$1$2ves" },
		{ regex: /(hive)$/i, replacement: "$1s" },
		{ regex: /([^aeiouy]|qu)y$/i, replacement: "$1ies" },
		{ regex: /(x|ch|ss|sh)$/i, replacement: "$1es" },
		{ regex: /(matr|vert|ind|d)(ix|ex)$/i, replacement: "$1ices" },
		{ regex: /(^[m|l])ouse$/i, replacement: "$1ice" },
		{ regex: /^(ox)$/i, replacement: "$1en" },
		{ regex: /(quiz)$/i, replacement: "$1zes" },
		{ regex: /(buz|blit|walt)z$/i, replacement: "$1zes" },
		{ regex: /(hoo|lea|loa|thie)f$/i, replacement: "$1ves" },
		{ regex: /(alumn|alg|larv|vertebr)a$/i, replacement: "$1ae" },
		{ regex: /(criteri|phenomen)on$/i, replacement: "$1a" },
		{ regex: /(p)erson$/i, replacement: "$1eople" },
		{ regex: /(m)an$/i, replacement: "$1en" },
		{ regex: /(h)uman$/i, replacement: "$1umans" },
		{ regex: /(c)hild$/i, replacement: "$1hildren" },
		{ regex: /(s)ex$/i, replacement: "$1exes" },
		{ regex: /(g)love$/i, replacement: "$1loves" },
		{ regex: /(m)ove$/i, replacement: "$1oves" },
		{ regex: /(g)oose$/i, replacement: "$1eese" },
		{ regex: /(w)ave$/i, replacement: "$1aves" },
		{ regex: /(f)oot$/i, replacement: "$1eet" },
		{ regex: /(t)ooth$/i, replacement: "$1eeth" },
		{ regex: /(c)urriculum$/i, replacement: "$1urricula" },
		{ regex: /(d)atabase$/i, replacement: "$1atabases" },
		{ regex: /(z)ombie$/i, replacement: "$1ombies" },
		{ regex: /(p)ersonnel$/i, replacement: "$1ersonnel" },
		{ regex: /(c)ache$/i, replacement: "$1aches" },
		{ regex: /^ex$/i, replacement: "exes" },
		{ regex: /^is$/i, replacement: "are" },
		{ regex: /^that$/i, replacement: "those" },
		{ regex: /^this$/i, replacement: "these" },
		{ regex: /^bus$/i, replacement: "buses" },
		{ regex: /^die$/i, replacement: "dice" },
		{ regex: /^tie$/i, replacement: "ties" },
		{ regex: /^(passer)(s)?by$/i, replacement: "$1sby" },
	]

	static complexWords: RegExp[] = [
		/^(.+?)(-in-.+?)$/,
		/^(.+?)(-by)$/,
	]

	static uncountables = {
		"aircraft": true,
		"bison": true,
		"corn": true,
		"corps": true,
		"deer": true,
		"elk": true,
		"equipment": true,
		"fish": true,
		"grass": true,
		"hair": true,
		"information": true,
		"l": true,
		"luggage": true,
		"mail": true,
		"means": true,
		"metadata": true,
		"milk": true,
		"ml": true,
		"money": true,
		"moose": true,
		"mud": true,
		"offspring": true,
		"oz": true,
		"percent": true,
		"rice": true,
		"salmon": true,
		"scissors": true,
		"semen": true,
		"series": true,
		"sheep": true,
		"shrimp": true,
		"someone": true,
		"species": true,
		"sperm": true,
		"staff": true,
		"swine": true,
		"tbsp": true,
		"training": true,
		"trout": true,
		"tsp": true,
		"tuna": true,
		"water": true,
		"waters": true,
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

	static ordinalExceptions = {
		1: "first",
		2: "second",
		3: "third",
		4: "fourth",
		5: "fifth",
		8: "eighth",
		9: "ninth",
		12: "twelfth"
	}

	static getDelimeter(): string {
		return "point";
	}

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

	static parseNumber(number: any, ordinal?: boolean): string {
		var signum: number = number.signum();
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
}
