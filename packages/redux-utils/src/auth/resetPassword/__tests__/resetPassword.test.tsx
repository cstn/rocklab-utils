import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import renderWithStore from '../../../test/utils';
import { selectResetPasswordError, selectResetPasswordStatus } from '../index';
import setup, { apiMock, actions } from './setup';

const Test = () => {
  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(actions.resetPassword({ token: 'Token', newPassword: 'Password' }));

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{error}</div>
      <button type="button" onClick={handleClick}>
        click
      </button>
    </div>
  );
};

describe('resetPassword', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render in idle mode by default', () => {
    renderWithStore(<Test />, { store });

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  it('should start password reset', () => {
    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(apiMock.resetPassword).toHaveBeenCalledWith('Token', 'Password');
  });

  it('should reset a password', async () => {
    (apiMock.resetPassword as jest.Mock).mockResolvedValueOnce({
      data: {},
    });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('resolved')).toBeInTheDocument();
  });

  it('should handle failed password reset', async () => {
    (apiMock.resetPassword as jest.Mock).mockResolvedValueOnce({ status: 400, error: { message: 'Test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Test');
  });

  it('should handle errors while password reset', async () => {
    (apiMock.resetPassword as jest.Mock).mockRejectedValueOnce({ message: 'test' });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Could not reset the password');
  });
});
