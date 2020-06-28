/**
 * @fileOverview toggle hook
 */

import { useState } from 'react';

/**
 * toggle hook
 * @param initialValue
 * @returns {(boolean|(function(): void))[]}
 */
function useToggle(initialValue) {
  const [status, setStatus] = useState(Boolean(initialValue));

  const toggleStatus = () => {
    setStatus(!status);
  };

  const toggleOn = () => {
    setStatus(true);
  };

  const toggleOff = () => {
    setStatus(false);
  };

  return [status, toggleStatus, toggleOn, toggleOff];
}

export default useToggle;
