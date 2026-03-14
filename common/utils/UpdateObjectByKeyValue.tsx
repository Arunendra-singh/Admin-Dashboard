/**
 *
 * @param sourceObj Source object
 * @param keyToFind Key of the nested target object that needs to be updated
 * @param valueToFind Value of the key
 * @param newObjPatch New value to be applied
 */
export const UpdateObjectByKeyValue = (sourceObj: any, keyToFind: string, valueToFind: string, newObjPatch: any): any => {
    for (const prop in sourceObj) {
        if (Object.prototype.hasOwnProperty.call(sourceObj, prop)) {
            if (prop === keyToFind && sourceObj[prop] === valueToFind) {
                Object.assign(sourceObj, newObjPatch);
            } else if (typeof sourceObj[prop] === "object") {
                UpdateObjectByKeyValue(sourceObj[prop], keyToFind, valueToFind, newObjPatch);
            }
        }
    }
    return sourceObj;
};
