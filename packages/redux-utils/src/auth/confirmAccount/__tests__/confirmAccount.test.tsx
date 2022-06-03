import React from 'react';
import { useDispatch } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import renderWithStore from '../../../test/utils';
import { selectConfirmedStatus, selectConfirmedError } from '../index';
import setup, { apiMock, actions } from './setup';
import { useTypedAuthSelector } from '../../authSelectors';

const Test = () => {
  const status = useTypedAuthSelector(selectConfirmedStatus);
  const error = useTypedAuthSelector(selectConfirmedError);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(actions.confirmAccount({ userId: 'user', token: 'token' }));

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

describe('confirmAccount', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render in idle mode by default', () => {
    renderWithStore(<Test />, { store });

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  it('should start account confirmation', () => {
    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(apiMock.confirmAccount).toHaveBeenCalledWith('user', 'token');
  });

  it('should confirm an account', async () => {
    (apiMock.confirmAccount as jest.Mock).mockResolvedValueOnce({
      data: {},
    });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('resolved')).toBeInTheDocument();
  });

  it('should handle failed account confirmation', async () => {
    (apiMock.confirmAccount as jest.Mock).mockResolvedValueOnce({ status: 400, data: { message: 'test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('test');
  });

  it('should handle errors while account confirmation', async () => {
    (apiMock.confirmAccount as jest.Mock).mockRejectedValueOnce({ message: 'test' });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('test');
  });
});
