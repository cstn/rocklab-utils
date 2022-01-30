import React from 'react';
import { render, screen } from '@testing-library/react';
import usePrevious from './usePrevious';

describe('useToggle', () => {
  const TestComponent = ({ value }: { value: string }) => {
    const text: string = usePrevious(value, 'initial');

    return <p>{text}</p>;
  };

  it('should render with initial value', () => {
    render(<TestComponent value="test" />);

    expect(screen.getByText('initial')).not.toBeNull();
    expect(screen.queryByText('test')).toBeNull();
  });

  it('should use previous value', () => {
    const { rerender } = render(<TestComponent value="previous" />);

    rerender(<TestComponent value="next" />);

    expect(screen.getByText('previous')).not.toBeNull();
    expect(screen.queryByText('next')).toBeNull();
  });
});
