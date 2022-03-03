import {default as BigDecimal} from "./BigDecimal"

export default class HumanizerNumberSpeller {
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

	static spellWords(number: any, ordinal?: boolean): string {
		var signum = number.signum();
		if (signum === 0) return this.getUnitValue(0, ordinal);
		if (signum < 0) return "minus " + this.spellWords(number.negate());

		const parts: string[] = [];
		var newInteger: BigDecimal = null;

		if (number.getActualIntegerLength() >= 19) {
			number = number.shiftLeft(18);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " quintillion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 16) {
			number = number.shiftLeft(15);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " quadrillion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 13) {
			number = number.shiftLeft(12);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " trillion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 10) {
			number = number.shiftLeft(9);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " billion");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 7) {
			number = number.shiftLeft(6);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " million");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 4) {
			number = number.shiftLeft(3);
			newInteger = number.integer();
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " thousand");
			}
			number = number.removeExponent(true);
		}

		if (number.getActualIntegerLength() >= 3) {
			newInteger = number.integer();
			newInteger = newInteger.shiftLeft(2);
			if (newInteger.getActualInt() != 0) {
				parts.push(this.spellWords(newInteger) + " hundred");
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

	static words(number: number | string, ordinal?: boolean): string {
		if (ordinal == null) {
			ordinal = false;
		}
		var bigDecimal: BigDecimal = new BigDecimal(number);
		var integerPart: BigDecimal = bigDecimal.integer();
		if (bigDecimal.signum() < 0) {
			integerPart.negate();
			ordinal = false;
		}

		var toWords: string = this.spellWords(integerPart, ordinal);

		var isInteger: boolean = true;

		if (!ordinal) {
			var remainderPart: string = bigDecimal.getStringifiedRemainder();
			if (parseInt(remainderPart) != 0) {
				var remaunderPartLength: number = remainderPart.length;
				toWords = toWords.concat(" point");
				for (var i: number = 0; i < remaunderPartLength; i++) {
					toWords = toWords.concat(" ", this.getUnitValue(parseInt(remainderPart[i]), false));
				}
			}
		}

		return toWords;
	}

	words(number: number | string, ordinal?: boolean): string {
		return HumanizerNumberSpeller.words(number, ordinal);
	}
}
