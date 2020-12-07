/*
 * Project: rocklab-utils.js
 * File: object.js
 *
 * object utils
 */

/**
 * shallow clone an object (class instance)
 * @param original
 * @returns {*}
 */
export const clone = original => Object.assign(Object.create(original), original);

/**
 * deep clone an object (class instance)
 * @param original
 * @returns {*}
 */
export function deepClone(original) {
  const cloned = clone(original);

  Object.keys(cloned).forEach(property => {
    if (typeof property === 'object') {
      cloned[property] = clone(property);
    }
  });

  return cloned;
}

/**
 * map object properties
 * @param original    the original object
 * @param func        the function to apply on values
 * @returns {object}
 */
export const map = (original, func) =>
  Object.assign({}, ...Object.keys(original).map(key => ({ [key]: func(original[key]) })));
