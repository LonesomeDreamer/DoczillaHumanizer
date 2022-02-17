import IDateTimeHumanizeStrategy from "./IDateTimeHumanizeStrategy";
import {singularize} from "../string/inflections";
import {words} from "../number";

enum TimeUnit {
    Year = "years",
    Month = "months",
    Day = "days",
    Hour = "hours",
    Minute = "minutes",
    Second = "seconds",
    Millisecond = "milliseconds"
}

enum Tense {
    Future,
    Past
}

function humanise(unit: TimeUnit, tense: Tense, amount: number) {
    if (amount === 0) return "now";

    const amountStr = amount < 10 ? words(amount) : amount.toString();

    const value = `${amountStr} ${amount === 1 ? singularize(unit) : unit}`;
    if (tense === Tense.Future) return `in ${value}`;
    return `${value} ago`;
}

export default class DefaultDateTimeHumanizeStrategy implements IDateTimeHumanizeStrategy {
    humanize(input: Date, comparisonBase: Date): string {
        const difference = Math.abs(comparisonBase.getTime() - input.getTime());
        const tense = input.getTime() > comparisonBase.getTime() ? Tense.Future : Tense.Past;

        let milliseconds = difference % 1000,
            seconds = Math.floor(difference / 1000) % 60,
            minutes = Math.floor(difference / 1000 / 60) % 60,
            hours = Math.floor(difference / 1000 / 60 / 60) % 24,
            days = Math.floor(difference / 1000 / 60 / 60 / 24);

        let years = 0, months = 0;

        if (milliseconds >= 1000) seconds++;
        if (seconds >= 60) minutes++;
        if (minutes >= 60) hours++;
        if (hours >= 24) days++;
        if (days === 31) months = 1;
        if (days === 366) years = 1;

        if (days > 31 && days < 366) {
            const factor = Math.floor(days / 30);
            const maxMonths = Math.ceil(days / 30);
            months = (days >= 30 * factor) ? maxMonths : maxMonths - 1;
        }

        if (days > 365) {
            const factor = Math.floor(days / 365);
            const maxMonths = Math.ceil(days / 365);
            years = (days >= 365 * factor) ? maxMonths : maxMonths - 1;
        }

        if (years > 0) return humanise(TimeUnit.Year, tense, years);
        if (months > 0) return humanise(TimeUnit.Month, tense, months);
        if (days > 0) return humanise(TimeUnit.Day, tense, days);
        if (hours > 0) return humanise(TimeUnit.Hour, tense, hours);
        if (minutes > 0) return humanise(TimeUnit.Minute, tense, minutes);
        if (seconds > 0) return humanise(TimeUnit.Second, tense, seconds);
        return humanise(TimeUnit.Millisecond, tense, 0);
    }
}
