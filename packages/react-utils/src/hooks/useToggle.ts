/**
 * @fileOverview toggle hook
 */

import { useState } from 'react';

type ReturnType = boolean | (() => void);

/**
 * toggle hook
 * @param initialValue
 * @returns {(boolean|(function(): void))[]}
 */
const useToggle = (initialValue = false): ReturnType[] => {
  const [status, setStatus] = useState(initialValue);

  const toggleStatus = (): void => {
    setStatus(!status);
  };

  const toggleOn = (): void => {
    setStatus(true);
  };

  const toggleOff = (): void => {
    setStatus(false);
  };

  return [status, toggleStatus, toggleOn, toggleOff];
};

export default useToggle;
