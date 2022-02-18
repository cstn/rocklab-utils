import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useToggle from './useToggle';

describe('useToggle', () => {
  const TestComponent = () => {
    const [status, toggleStatus, toggleOn, toggleOff] = useToggle();

    const handleToggle = () => {
      toggleStatus();
    };

    const handleToggleOn = () => {
      toggleOn();
    };

    const handleToggleOff = () => {
      toggleOff();
    };

    return (
      <div>
        <p data-testid="status">{status ? 'yes' : 'no'}</p>
        <button type="button" onClick={handleToggle}>
          toggle
        </button>
        <button type="button" onClick={handleToggleOn}>
          on
        </button>
        <button type="button" onClick={handleToggleOff}>
          off
        </button>
      </div>
    );
  };

  it('should be toggled off by default', () => {
    render(<TestComponent />);

    expect(screen.getByText('no')).toBeDefined();
  });

  it('should be toggled', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText('yes')).toBeDefined();
  });

  it('should be toggled on and off', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByRole('button', { name: 'on' }));

    expect(screen.getByText('yes')).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'off' }));

    expect(screen.getByText('no')).toBeDefined();
  });
});
