export default class BigDecimal {
	// to preserve trailing zeroes in exponent, 'value' should be of String type
	constructor(value: any) {
		var originalValue: string = value.toString().trim();
		if (!value.toString().includes('e')) {
			// simplified parsing that allows to preserve exponent precision (e.g. 0.2000 instead of 0.2)
			value = value.toString().trim().split('.');
			if (value.length > 1) {
				this.scale = value[1].length;
				this.intCompact = parseInt(value[0].concat(value[1]));
			} else {
				this.scale = 0;
				this.intCompact = parseInt(value[0]);
			}
		} else {
			// for scientific notation; saving exponent precision is not possible here
			value = parseFloat(value).toString().trim().split('e');
			var base: string = value[0];
			var exponent: number = 0;
			if (value.length > 1) {
				exponent = parseInt(value[1]);
			}
			value = base.toString().split('.');
			if (value.length > 1) {
				this.scale = value[1].length - exponent;
				this.intCompact = parseInt(value[0].concat(value[1]));
			} else {
				this.scale = -exponent;
				this.intCompact = parseInt(value[0]);
			}
		}
		this.precision = this.calculateIntegerLength();
		this.stringifiedValue = this.stringifyIntCompact(originalValue);
	}

	intCompact: number;

	precision: number;

	scale: number;

	stringifiedValue: string;

	calculateIntegerLength(): number {
		var value: number = Math.abs(this.intCompact);
		if (value == 0) {
			return 1;
		}
		return Math.floor(Math.log10(value)) + 1;
	}

	calculateExponentLength(value: number): number {
		value = Math.abs(value);
		var e: number = 1;
		while ((Math.round(value * e) / e) !== value) {
			e *= 10;
		}
		return Math.round(Math.log(e) / Math.LN10);
	}

	signum(): number {
		var intCompact = this.intCompact;
		return intCompact > 0 ? 1 : 1 / intCompact == 1 / +0 ? 0 : -1;
	}

	negate(): BigDecimal {
		this.intCompact = -this.intCompact;
		return this;
	}

	shiftLeft(amount: number): BigDecimal {
		var stringifiedValue: string = this.stringifiedValue;
		var stringifiedInt: string = this.getStringifiedInt();
		var stringifiedRemainder: string = this.getStringifiedRemainder();
		var pointIndex: number = this.getActualIntegerLength() - amount;
		if (amount == 0) {
		} else if (pointIndex == 0) {
			stringifiedValue = "0".concat(stringifiedInt, stringifiedRemainder);
		} else if (pointIndex > 0) {
			stringifiedValue = stringifiedInt.slice(0, pointIndex).concat(".", stringifiedInt.slice(pointIndex), stringifiedRemainder);
		} else {
			var additionalZeroes: string = "";
			for (var i: number = pointIndex; i < 0; i++) {
				additionalZeroes = additionalZeroes.concat("0");
			}
			stringifiedValue = "0".concat(additionalZeroes, stringifiedInt, stringifiedRemainder);
		}
		return new BigDecimal(stringifiedValue);
	}

	integer(): BigDecimal {
		return new BigDecimal(this.getStringifiedInt());
	}

	remainder(): BigDecimal {
		return new BigDecimal('0.'.concat(this.getStringifiedRemainder()));
	}

	getActualExponentLength(): number {
		return this.getStringifiedRemainder().length;
	}

	getActualIntegerLength(): number {
		return this.getStringifiedInt().length;
	}

	removeExponent(removeTrailingZero?: boolean): BigDecimal {
		var stringifiedRemainder: string = this.getStringifiedRemainder();
		if (removeTrailingZero) {
			if (stringifiedRemainder[stringifiedRemainder.length - 1] == '0') {
				stringifiedRemainder = stringifiedRemainder.slice(0, -1);
			}
		}
		return new BigDecimal(stringifiedRemainder);
	}

	getIntCompact(): number {
		return this.intCompact;
	}

	stringifyIntCompact(value: any): string {
		var stringifiedValue: any = value.toString();
		if (stringifiedValue.charCodeAt(0) == 45) {
			stringifiedValue = stringifiedValue.slice(1);
		}
		var scale: number = 0;
		// scientific notation
		if (stringifiedValue.includes('e')) {
			stringifiedValue = stringifiedValue.split('e');
			scale -= parseInt(stringifiedValue[1]);
			stringifiedValue = stringifiedValue[0];
		}
		if (stringifiedValue.includes('.')) {
			stringifiedValue = stringifiedValue.split('.');
			scale = parseInt(stringifiedValue[1].length) + scale;
			stringifiedValue = stringifiedValue[0].concat(stringifiedValue[1]);
		}
		if (scale < 0) {
			for (var i: number = 0; i > scale; i--) {
				stringifiedValue = stringifiedValue.concat('0');
			}
			stringifiedValue = stringifiedValue.concat('.0');
		} else if (scale == 0) {
			stringifiedValue = stringifiedValue.concat('.0');
		} else {
			var precision: number = stringifiedValue.length;
			scale = precision - scale;
			if (scale > 0) {
				var integerPart: string = stringifiedValue.slice(0, scale);
				var decimalPart: string = stringifiedValue.slice(scale);
				stringifiedValue = integerPart.concat('.').concat(decimalPart);
			} else {
				for (var i: number = 0; i > scale; i--) {
					stringifiedValue = '0'.concat(stringifiedValue);
				}
				stringifiedValue = '0.'.concat(stringifiedValue);
			}
		}

		return stringifiedValue;
	}

	toPlainString(): string {
		var delimeter: number = this.precision - this.scale;
		var valStr: string = this.intCompact.toString();
		var integer: string = valStr.slice(0, delimeter);
		var remainder: string = valStr.slice(delimeter);
		return integer.concat('.').concat(remainder);
	}

	getActualInt(): number {
		return parseInt(this.getStringifiedInt());
	}

	getStringifiedInt(): string {
		return this.stringifiedValue.split('.')[0];
	}

	getStringifiedRemainder(): string {
		return this.stringifiedValue.split('.')[1];
	}
}
