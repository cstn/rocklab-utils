/**
 * @fileOverview object helper functions
 */

/**
 * shallow clone an object
 * @param original
 * @returns {*}
 */
const shallowClone = <T>(original: T | T[] | Date): T | T[] | Date => {
  if (original instanceof Array) {
    return Array.from(original);
  }

  if (original instanceof Date) {
    return new Date(original);
  }

  if (typeof original !== 'object') {
    return original;
  }

  return Object.keys(original).reduce((acc, property) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[property] = original[property];

    return acc;
  }, {} as T);
};

/**
 * deep clone an object
 * @returns {*}
 * @param original
 */
const deepClone = <T>(original: T | T[] | Date): T | T[] | Date => {
  if (original === null || original === undefined) {
    return original;
  }

  if (original instanceof Array) {
    return original.map((item) => deepClone(item) as T);
  }

  if (original instanceof Date) {
    return new Date(original.toISOString());
  }

  if (typeof original !== 'object') {
    return original;
  }

  return Object.keys(original).reduce((acc, property) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[property] = deepClone(original[property]);

    return acc;
  }, {} as T);
};

/**
 * map object property values or array values
 * @param original
 * @param mapper
 */
const map = <T extends Record<string, unknown> | T[]>(
  original: T | T[],
  mapper: (param: unknown) => unknown
): T | T[] => {
  if (original instanceof Array) {
    return original.map((item) => mapper(item)) as T[];
  }

  if (typeof original === 'object') {
    return Object.keys(original).reduce((acc, property) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      acc[property] = mapper(original[property]);

      return acc;
    }, {} as T);
  }

  throw new Error('Map only supports arrays or objects');
};

export { shallowClone, deepClone, map };
