import React, { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import useInterval from './useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  const TestComponent = ({ delay }: { delay: number }) => {
    const [count, setCount] = useState(1);
    useInterval(() => setCount(count + 1), { delay });

    return <div>{count}</div>;
  };

  it('should render with interval', () => {
    const delay = 100;

    const { rerender } = render(<TestComponent delay={delay} />);

    expect(screen.getByText('1')).not.toBeNull();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    rerender(<TestComponent delay={delay} />);
    expect(screen.getByText('2')).not.toBeNull();
  });
});
