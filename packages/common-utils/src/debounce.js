/*
 * Project: rocklab-utils
 * File: misc.js
 *
 * mics utils
 */

/**
 * debounce execution
 * @param callback
 * @param time
 * @returns {Function}
 */
export default function debounce(callback, time) {
  let timeout;

  return function debounced(...args) {
    const context = this;

    const later = function later(params) {
      timeout = null;
      callback.apply(context, params);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, time, args);
  };
}
