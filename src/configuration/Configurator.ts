import {default as HumanizerSpellResult} from "../util/HumanizerSpellResult";
import {default as HumanizerNumberSpeller} from "../number/HumanizerNumberSpeller";

export default class Configurator {
	static convert(input: Date, culture: string): HumanizerSpellResult[] {
		var numberSpeller: HumanizerNumberSpeller = new HumanizerNumberSpeller();
		var day: string = numberSpeller.spell(parseInt(input.toLocaleString(culture, {day: 'numeric'})), null, true).getNumber();
		var month: string = input.toLocaleString(culture, {month: 'long'});
		var year: string = numberSpeller.spell(parseInt(input.toLocaleString(culture, {year: 'numeric'}))).getNumber();
		return [new HumanizerSpellResult(day, month), new HumanizerSpellResult(year, 'year')];
	}
}
