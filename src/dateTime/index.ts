import IDateTimeHumanizeStrategy from "./IDateTimeHumanizeStrategy";

export {default as IDateTimeHumanizeStrategy} from "./IDateTimeHumanizeStrategy";

export default function humanize(time: Date, from: Date = new Date(), strategy: IDateTimeHumanizeStrategy) {
    return strategy.humanize(time, from);
}
