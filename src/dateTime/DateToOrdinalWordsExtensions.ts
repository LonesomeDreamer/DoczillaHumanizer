import {default as HumanizerSpellResult} from "../util";
import {default as Configurator} from "../configuration";

export default class DateToOrdinalWordsExtensions {
	toOrdinalWords(input: Date, culture: string): HumanizerSpellResult[] {
		return Configurator.convert(input, culture);
	}
}
