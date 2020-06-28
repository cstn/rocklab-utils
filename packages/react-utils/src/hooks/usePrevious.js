/**
 * @fileOverview previous value hook
 */

import { useEffect, useRef } from 'react';

/**
 * previous value hook
 * @param value
 * @param initialValue
 * @returns {*}
 */
function usePrevious(value, initialValue) {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
