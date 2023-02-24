/* getNestedProperty implementation */
export const getProp = (object: any, keys: any, defaultVal?: string): string => {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  console.log(keys);
  object = object[keys[0]];
  console.log({
    object,
  });
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1));
  }
  return object === undefined ? defaultVal : object;
};
