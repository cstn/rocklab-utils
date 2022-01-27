/**
 * shallow clone an object
 * @param original
 * @returns {*}
 */
const shallowClone = <T extends object | T[] | null | undefined>(
  original: T | null | undefined
): T | T[] | null | undefined => {
  if (original === null || original === undefined) {
    return original;
  }

  if (original instanceof Array) {
    return Array.from(original) as T[];
  }

  if (original instanceof Set) {
    return new Set(Array.from(original)) as T;
  }

  if (original instanceof Map) {
    return new Map(Array.from(original)) as T;
  }

  if (original instanceof Date) {
    return new Date(original) as T;
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
const deepClone = <T extends object | T[] | null | undefined>(
  original: T | null | undefined
): T | T[] | null | undefined => {
  if (original === null || original === undefined) {
    return original;
  }

  if (original instanceof Array) {
    return original.map((item) => deepClone(item)) as T[];
  }

  if (original instanceof Set) {
    return new Set(Array.from(original, deepClone)) as T;
  }

  if (original instanceof Map) {
    return new Map(Array.from(original, ([property, value]) => [property, deepClone(value)])) as T;
  }

  if (original instanceof Date) {
    return new Date(original) as T;
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
 * map object propertiy values or array values
 * @param original
 * @param mapper
 */
const map = <T extends object | T[]>(original: T | T[], mapper: (param: unknown) => unknown): T | T[] => {
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
