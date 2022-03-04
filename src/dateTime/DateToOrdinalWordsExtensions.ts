import {default as HumanizerSpellResult} from "../util/HumanizerSpellResult";
import {default as Configurator} from "../configuration/Configurator";

export default class DateToOrdinalWordsExtensions {
	toOrdinalWords(input: Date, culture: string): HumanizerSpellResult[] {
		return Configurator.convert(input, culture);
	}
}
