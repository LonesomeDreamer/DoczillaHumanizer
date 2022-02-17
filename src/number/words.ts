const ordinalExceptions = {
    1: "first",
    2: "second",
    3: "third",
    5: "fifth",
    8: "eighth",
    9: "ninth",
    12: "twelfth"
};

const unitsMap = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
];

const tensMap = [
    "zero",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
];

function getUnitValue(number: number, ordinal: boolean) {
    if (ordinal) {
        if (number in ordinalExceptions) return ordinalExceptions[number as keyof typeof ordinalExceptions];
        return unitsMap[number] + "th";
    }

    return unitsMap[number];
}

function removeOnePrefix(words: string) {
    if (words.startsWith("one")) return words.substring(4);
    return words;
}

export default function words(number: number, ordinal = false): string {
    number = Math.floor(number);

    if (number === 0) return getUnitValue(0, ordinal);
    if (number < 0) return "minus " + words(-number);

    const parts: string[] = [];

    if (number / 1e18 >= 1) {
        parts.push(words(number / 1e18) + " quintillion");
        number %= 1e18;
    }

    if (number / 1e15 >= 1) {
        parts.push(words(number / 1e15) + " quadrillion");
        number %= 1e15;
    }

    if (number / 1e12 >= 1) {
        parts.push(words(number / 1e12) + " trillion");
        number %= 1e12;
    }

    if (number / 1e9 >= 1) {
        parts.push(words(number / 1e9) + " billion");
        number %= 1e9;
    }

    if (number / 1e6 >= 1) {
        parts.push(words(number / 1e6) + " million");
        number %= 1e6;
    }

    if (number / 1e3 >= 1) {
        parts.push(words(number / 1e3) + " thousand");
        number %= 1e3;
    }

    if (number / 100 >= 1) {
        parts.push(words(number / 100) + " hundred");
        number %= 100;
    }

    if (number > 0) {
        if (parts.length !== 0) parts.push("and");

        if (number < 20) parts.push(getUnitValue(number, ordinal));
        else {
            let lastPart = tensMap[Math.floor(number / 10)];
            if (number % 10 > 0) lastPart += "-" + getUnitValue(number % 10, ordinal);
            else if (ordinal) lastPart = lastPart.replace(/y$/, "") + "ieth";
            parts.push(lastPart);
        }
    } else if (ordinal) parts[parts.length - 1] += "th";

    let toWords = parts.join(" ");
    if (ordinal) toWords = removeOnePrefix(toWords);
    return toWords;
}
