export const getValueFromPath = (obj: any, path: string) => {
    const keys = path.replace(/\[(\w+)\]/g, ".$1").split(".");
    return keys.reduce((acc, key, i) => (acc ? acc[key] : undefined), obj);
};
