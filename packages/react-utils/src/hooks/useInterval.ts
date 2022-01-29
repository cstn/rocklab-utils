/**
 * @fileOverview interval hook
 */

import { useEffect, useRef } from 'react';

interface Options {
  delay?: number;
  immediately: boolean;
}

const DEFAULT_OPTIONS: Options = {
  immediately: false,
};

const useInterval = <T extends (...params: never[]) => void>(
  callback: T,
  { delay, immediately = false }: Options = DEFAULT_OPTIONS
) => {
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
};

export default useInterval;
