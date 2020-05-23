/**
 * @fileOverview previous value hook
 */

import { useEffect, useRef } from 'react';

function usePrevious(value, initialValue) {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
