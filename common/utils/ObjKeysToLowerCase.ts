export const ObjKeysToLowerCase = (inputObj: any): any => {
    if (typeof inputObj !== "object") return inputObj;
    if (Array.isArray(inputObj)) return inputObj.map(ObjKeysToLowerCase);
    return Object.keys(inputObj).reduce(function (newObj: any, key) {
        const val = inputObj[key];
        const newVal = (typeof val === "object") && val !== null ? ObjKeysToLowerCase(val) : val;
        newObj[key.toLowerCase()] = newVal;
        return newObj;
    }, {});
};
