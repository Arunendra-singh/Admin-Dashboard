/**
 * @param {number} unixTimeStamp should be a 10 digit number eg: 1680250363
 */
export const FormatDate = ({ unixTimeStamp, options = { year: "numeric", month: "short", day: "numeric" }, locales = "en-us" }: { unixTimeStamp: number; options?: Intl.DateTimeFormatOptions; locales?: Intl.LocalesArgument }) => {
    return new Date(unixTimeStamp * 1000).toLocaleDateString(locales, options);
};
