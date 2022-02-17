export default interface IDateTimeHumanizeStrategy {
    /**
     * Calculates the distance of time in words between two provided dates
     */
    humanize(input: Date, comparisonBase: Date): string;
}
