export default class HumanizerDateSpeller {
	constructor(number: string, unit: string) {
		this.number = number;
		this.unit = unit;
	}

	number: string;

	unit: string;

	getNumber(): string {
		return this.number;
	}

	getUnit(): string {
		return this.unit;
	}
}
