import React from 'react';
import { useDispatch } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithStore from '../../../test/utils';
import { selectRequestPasswordError, selectRequestPasswordStatus } from '../index';
import setup, { apiMock, actions } from './setup';
import { useTypedAuthSelector } from '../../authSelectors';

const Test = () => {
  const status = useTypedAuthSelector(selectRequestPasswordStatus);
  const error = useTypedAuthSelector(selectRequestPasswordError);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(actions.requestPassword({ email: 'test@rocklab.de' }));

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

describe('requestPassword', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render in idle mode by default', () => {
    renderWithStore(<Test />, { store });

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  it('should start password request', () => {
    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(apiMock.requestPassword).toHaveBeenCalledWith('test@rocklab.de');
  });

  it('should request a password', async () => {
    (apiMock.requestPassword as jest.Mock).mockResolvedValueOnce({
      data: {},
    });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('resolved')).toBeInTheDocument();
  });

  it('should handle failed password request', async () => {
    (apiMock.requestPassword as jest.Mock).mockResolvedValueOnce({ status: 400, data: { message: 'test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('test');
  });

  it('should handle errors while password request', async () => {
    (apiMock.requestPassword as jest.Mock).mockRejectedValueOnce({ data: { message: 'test' } });

    renderWithStore(<Test />, { store });

    fireEvent.click(screen.getByRole('button', { name: 'click' }));

    expect(await screen.findByText('rejected')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('test');
  });
});
