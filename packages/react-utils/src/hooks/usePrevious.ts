/**
 * @fileOverview previous value hook
 */

import { useEffect, useRef } from 'react';

/**
 * previews value hook
 * @param value
 * @param initialValue
 */
const usePrevious = <T>(value: T, initialValue: T): T => {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
