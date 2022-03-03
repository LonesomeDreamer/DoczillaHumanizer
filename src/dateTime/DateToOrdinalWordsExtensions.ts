import {default as HumanizerDateSpeller} from "./HumanizerDateSpeller";
import {default as Configurator} from "../configuration/Configurator";

export default class DateToOrdinalWordsExtensions {
	toOrdinalWords(input: Date, culture: string): HumanizerDateSpeller[] {
	    return Configurator.convert(input, culture);
	}
}
