/**
 * @fileOverview interval hook
 */

import { useEffect, useRef } from 'react';

function useInterval(callback, { delay, immediately = false } = {}) {
  const callbackRef = useRef(() => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = () => callbackRef.current();

    const id = setInterval(handler, delay);
    return () => clearInterval(id);
  }, [delay]);

  if (immediately) {
    callback();
  }
}

export default useInterval;
