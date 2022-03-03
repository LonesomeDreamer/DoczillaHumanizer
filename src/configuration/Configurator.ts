import {default as HumanizerDateSpeller} from "../dateTime/HumanizerDateSpeller";
import {default as HumanizerNumberSpeller} from "../number/HumanizerNumberSpeller";

export default class Configurator {
	static convert(input: Date, culture: string): HumanizerDateSpeller[] {
		var numberSpeller: HumanizerNumberSpeller = new HumanizerNumberSpeller();
		var day: string = numberSpeller.words(parseInt(input.toLocaleString(culture, {day: 'numeric'})), true);
		var month: string = input.toLocaleString(culture, {month: 'long'});
		var year: string = numberSpeller.words(parseInt(input.toLocaleString(culture, {year: 'numeric'})));
		return [new HumanizerDateSpeller(day, month), new HumanizerDateSpeller(year, 'year')];
	}
}
