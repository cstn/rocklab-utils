import React from 'react';
import { useDispatch } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithStore from '../../../test/utils';
import { useTypedAuthSelector } from '../../authSelectors';
import { selectChangePasswordError, selectChangePasswordStatus } from '../index';
import setup, { apiMock, actions } from './setup';

const Test = () => {
  const status = useTypedAuthSelector(selectChangePasswordStatus);
  const error = useTypedAuthSelector(selectChangePasswordError);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(actions.changePassword({ oldPassword: 'Password', newPassword: 'Test123' }));

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{error?.message}</div>
      <button type="button" onClick={handleClick}>
        click
      </button>
    </div>
  );
};

describe('changePassword', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render in idle mode by default', () => {
    renderWithStore(<Test />, { store });

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  it('should start password change', () => {
    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(apiMock.changePassword).toHaveBeenCalledWith('Password', 'Test123');
  });

  it('should request a password', async () => {
    (apiMock.changePassword as jest.Mock).mockResolvedValueOnce({
      data: {},
    });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('resolved')).toBeInTheDocument();
  });

  it('should handle failed password change', async () => {
    (apiMock.changePassword as jest.Mock).mockResolvedValueOnce({ status: 400, data: { message: 'test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('test');
  });

  it('should handle errors while password change', async () => {
    (apiMock.changePassword as jest.Mock).mockRejectedValueOnce({ data: { message: 'test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('test');
  });
});
