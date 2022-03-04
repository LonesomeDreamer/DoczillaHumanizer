import {default as BigDecimal} from "../number/BigDecimal"

export default class GermanNumberToWordsConverter {
	static unitsMap = [
		"null",
		"ein",
		"zwei",
		"drei",
		"vier",
		"fünf",
		"sechs",
		"sieben",
		"acht",
		"neun",
		"zehn",
		"elf",
		"zwölf",
		"dreizehn",
		"vierzehn",
		"fünfzehn",
		"sechzehn",
		"siebzehn",
		"achtzehn",
		"neunzehn"
	]

	static tensMap = [
		"null",
		"zehn",
		"zwanzig",
		"dreißig",
		"vierzig",
		"fünfzig",
		"sechzig",
		"siebzig",
		"achtzig",
		"neunzig"
	]

	static unitsOrdinal = [
		"",
		"ers",
		"zwei",
		"drit",
		"vier",
		"fünf",
		"sechs",
		"sieb",
		"ach",
		"neun",
		"zehn",
		"elf",
		"zwölf",
		"dreizehn",
		"vierzehn",
		"fünfzehn",
		"sechzehn",
		"siebzehn",
		"achtzehn",
		"neunzehn"
	]

	static hundredOrdinalSingular = [
		"einhundert"
	]

	static hundredOrdinalPlural = [
		"hundert"
	]

	static thousandOrdinalSingular = [
		"eintausend"
	]

	static thousandOrdinalPlural = [
		"tausend"
	]

	static millionOrdinalSingular = [
		"einmillion",
		"einemillion"
	]

	static millionOrdinalPlural = [
		"million",
		"millionen"
	]

	static billionOrdinalSingular = [
		"einmilliard",
		"einemilliarde"
	]

	static billionOrdinalPlural = [
		"milliard",
		"milliarden"
	]

	static getDelimeter(): string {
		return "punkt";
	}

	static getUnitValue(number: number, ordinal?: boolean) {
		const unitsMap = this.unitsMap;
		if (ordinal) {
			var spelledNumber: string = "";
			if (number > 0) {
				spelledNumber = spelledNumber.concat((number < 20) ? this.unitsOrdinal[number] : this.parseCardinalNumber(new BigDecimal(number)));
			}

			if ((number == 0) || (number >= 20)) {
				spelledNumber = spelledNumber.concat("s");
			}

			return spelledNumber = spelledNumber.concat("ter");
		}

		return unitsMap[number];
	}

	static noRestIndex(number: BigDecimal): number {
		return number.signum() == 0 ? 0 : 1;
	}

	static part(pluralFormat: string, singular: string, number: BigDecimal): string {
		number = number.integer();
		if (number.getActualInt() == 1) {
			return singular;
		}

		return this.parseNumber(number).concat(pluralFormat);
	}

	static collectParts(parts: string[], number: BigDecimal, divisor: number, addSpaceBeforeNextPart: boolean, pluralFormat: string, singular: string): BigDecimal {
		if (number.getActualIntegerLength() >= (divisor + 1)) {
			number = number.shiftLeft(divisor);
			parts.push(this.part(pluralFormat, singular, number));
			number = number.removeExponent(true);
			if (addSpaceBeforeNextPart && (number.signum() > 0)) {
				parts.push(" ");
			}
		}

		return number;
	}

	static collectOrdinalParts(parts: string[], number: BigDecimal, divisor: number, evaluateNoRest: boolean, pluralFormats: string[], singulars: string[]): BigDecimal {
		if (number.getActualIntegerLength() >= (divisor + 1)) {
			number = number.shiftLeft(divisor);
			var noRest: number = evaluateNoRest ? this.noRestIndex(number.removeExponent(true)) : 0;
			parts.push(this.part(pluralFormats[noRest], singulars[noRest], number));
			number = number.removeExponent(true);
		}

		return number;
	}

	static parseCardinalNumber(number: any): string {
		var signum = number.signum();
		if (signum === 0) {
			return this.getUnitValue(0, false);
		}
		var parts: string[] = [];
		if (signum < 0) {
			parts.push("minus ");
			number.negate();
		}

		number = this.collectParts(parts, number, 18, true, " Trillionen", "eine Trillion");
		number = this.collectParts(parts, number, 15, true, " Billiarden", "eine Billiarde");
		number = this.collectParts(parts, number, 12, true, " Billionen", "eine Billion");
		number = this.collectParts(parts, number, 9, true, " Milliarden", "eine Milliarde");
		number = this.collectParts(parts, number, 6, true, " Millionen", "eine Million");
		number = this.collectParts(parts, number, 3, false, "tausend", "eintausend");
		number = this.collectParts(parts, number, 2, false, "hundert", "einhundert");

		number = number.getActualInt();
		if (number > 0) {
			if (number < 20) {
				parts.push(this.getUnitValue(number, false));
			} else {
				var units: number = number % 10;
				if (units > 0) {
					parts.push(this.getUnitValue(units, false).concat("und"));
				}

				parts.push(this.tensMap[Math.floor(number / 10)]);
			}
		}

		return parts.join("");
	}

	static parseOrdinalNumber(number: any): string {
		var signum = number.signum();
		if (signum === 0) {
			return this.getUnitValue(0, false) + "ter";
		}
		var parts: string[] = [];
		if (signum < 0) {
			parts.push("minus ");
			number.negate();
		}

		number = this.collectOrdinalParts(parts, number, 9, true, this.billionOrdinalPlural, this.billionOrdinalSingular);
		number = this.collectOrdinalParts(parts, number, 6, true, this.millionOrdinalPlural, this.millionOrdinalSingular);
		number = this.collectOrdinalParts(parts, number, 3, false, this.thousandOrdinalPlural, this.thousandOrdinalSingular);
		number = this.collectOrdinalParts(parts, number, 2, false, this.hundredOrdinalPlural, this.hundredOrdinalSingular);

		parts.push(this.getUnitValue(number.getActualInt(), true));

		return parts.join("");
	}

	static parseNumber(number: any, ordinal?: boolean): string {
		return ordinal ? this.parseOrdinalNumber(number) : this.parseCardinalNumber(number);
	}
}
