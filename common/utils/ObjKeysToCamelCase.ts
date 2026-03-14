export const ObjKeysToCamelCase = (inputObj: any): any => {
    if (typeof inputObj !== "object") return inputObj;
    if (Array.isArray(inputObj)) return inputObj.map(ObjKeysToCamelCase);
    return Object.keys(inputObj).reduce(function (newObj: any, key) {
        const val = inputObj[key];
        const newVal = typeof val === "object" && val !== null ? ObjKeysToCamelCase(val) : val;
        newObj[key.charAt(0).toUpperCase() + key.substring(1)] = newVal;
        return newObj;
    }, {});
};
