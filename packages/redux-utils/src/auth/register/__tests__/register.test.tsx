import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import renderWithStore from '../../../test/utils';
import { selectRegisterStatus, selectRegisterError } from '../index';
import setup, { apiMock, actions } from './setup';

const Test = () => {
  const status = useSelector(selectRegisterStatus);
  const error = useSelector(selectRegisterError);
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(actions.registerUser({ username: 'test', email: 'test@rocklab.de', password: 'Test123' }));

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

describe('register', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render in idle mode by default', () => {
    renderWithStore(<Test />, { store });

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  it('should start registration', () => {
    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(apiMock.register).toHaveBeenCalledWith({ email: 'test@rocklab.de', password: 'Test123', username: 'test' });
  });

  it('should register an account', async () => {
    (apiMock.register as jest.Mock).mockResolvedValueOnce({
      data: {},
    });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('resolved')).toBeInTheDocument();
  });

  it('should handle failed account registration', async () => {
    (apiMock.register as jest.Mock).mockResolvedValueOnce({ status: 400, error: { message: 'Test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Test');
  });

  it('should handle errors while account registration', async () => {
    (apiMock.register as jest.Mock).mockRejectedValueOnce({ message: 'test' });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Could not register a new account');
  });
});