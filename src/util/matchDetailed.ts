export default function matchDetailed(input: string, regex: RegExp) {
    let match: RegExpExecArray;
    const matches: RegExpExecArray[] = [];

    while (match = regex.exec(input)) {
        matches.push(match);
    }

    return matches;
}
