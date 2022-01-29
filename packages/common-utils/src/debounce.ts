/**
 * @fileOverview debounced functions
 */

/**
 * debounce execution
 * @param callback
 * @param time
 * @returns {Function}
 */
const debounce = <T extends (...params: never[]) => void>(callback: T, time: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => callback(...args), time);
  };

  return debounced as (...args: Parameters<T>) => void;
};

export default debounce;
