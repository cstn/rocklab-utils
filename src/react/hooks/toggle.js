/**
 * @fileOverview toggle hook
 */

import { useState } from 'react';

function useToggle(initialValue) {
  const [status, setStatus] = useState(Boolean(initialValue));

  const toggleStatus = () => setStatus(!status);

  return [status, toggleStatus];
}

export default useToggle;
