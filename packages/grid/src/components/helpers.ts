/* getNestedProperty implementation */
export const getProp = (object: any, keys: any, defaultVal?: string): string => {
  keys = Array.isArray(keys) ? keys : keys.split('.');

  object = object[keys[0]];

  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1));
  }
  return object === undefined ? defaultVal : object;
};
