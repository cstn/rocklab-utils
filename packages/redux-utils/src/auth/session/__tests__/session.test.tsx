import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, screen } from '@testing-library/react';
import renderWithStore from '../../../test/utils';
import { selectSessionStatus, selectCurrentUser, selectSessionError, selectCurrentUserProfile } from '../index';
import setup, { apiMock, actions } from './setup';

const Test = () => {
  const status = useSelector(selectSessionStatus);
  const error = useSelector(selectSessionError);
  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectCurrentUserProfile);
  const dispatch = useDispatch();
  const handleLogin = () => dispatch(actions.loginUser({ username: 'test', password: 'password' }));
  const handleLogout = () => dispatch(actions.logoutUser());
  const handleSessionRefresh = () => dispatch(actions.sessionUser('token'));

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{error}</div>
      <div data-testid="username">{user?.username}</div>
      <div data-testid="firstName">{profile?.firstName}</div>
      <button type="button" onClick={handleLogin}>
        login
      </button>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
      <button type="button" onClick={handleSessionRefresh}>
        session
      </button>
    </div>
  );
};

describe('session', () => {
  let store: Store;

  beforeEach(() => {
    store = setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render in idle mode by default', () => {
    renderWithStore(<Test />, { store });

    expect(screen.getByText('idle')).toBeInTheDocument();
  });

  describe('login', () => {
    it('should start login', () => {
      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'login' }));

      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(apiMock.login).toHaveBeenCalledWith({ username: 'test', password: 'password' });
    });

    it('should login', async () => {
      (apiMock.login as jest.Mock).mockResolvedValueOnce({
        data: { user: { username: 'test' }, profile: { firstName: 'Tom' } },
      });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'login' }));

      expect(await screen.findByText('resolved')).toBeInTheDocument();
      expect(screen.getByTestId('username')).toHaveTextContent('test');
      expect(screen.getByTestId('firstName')).toHaveTextContent('Tom');
    });

    it('should handle failed login', async () => {
      (apiMock.login as jest.Mock).mockResolvedValueOnce({ status: 400, error: { message: 'Test' } });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'login' }));

      expect(await screen.findByText('rejected')).toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Test');
    });

    it('should handle errors while login', async () => {
      (apiMock.login as jest.Mock).mockRejectedValueOnce({ message: 'test' });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'login' }));

      expect(await screen.findByText('rejected')).toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Could not login');
    });
  });

  describe('logout', () => {
    afterEach(jest.clearAllMocks);

    it('should start logout', () => {
      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'logout' }));

      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(apiMock.logout).toHaveBeenCalled();
    });

    it('should logout', async () => {
      (apiMock.logout as jest.Mock).mockResolvedValueOnce({});

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'logout' }));

      expect(await screen.findByText('resolved')).toBeInTheDocument();
    });

    it('should handle failed logout', async () => {
      (apiMock.logout as jest.Mock).mockResolvedValueOnce({ status: 400, error: { message: 'Test' } });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'logout' }));

      expect(await screen.findByText('rejected')).toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Test');
    });

    it('should handle errors while logout', async () => {
      (apiMock.logout as jest.Mock).mockRejectedValueOnce({ message: 'test' });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'logout' }));

      expect(await screen.findByText('rejected')).toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Could not logout');
    });
  });

  describe('session', () => {
    it('should start session refresh', () => {
      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'session' }));

      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(apiMock.session).toHaveBeenCalled();
    });

    it('should refresh a session', async () => {
      (apiMock.session as jest.Mock).mockResolvedValueOnce({});

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'session' }));

      expect(await screen.findByText('resolved')).toBeInTheDocument();
    });

    it('should handle failed session refresh', async () => {
      (apiMock.session as jest.Mock).mockResolvedValueOnce({ status: 400, error: { message: 'Test' } });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'session' }));

      expect(await screen.findByText('rejected')).toBeInTheDocument();
    });

    it('should handle errors while session refresh', async () => {
      (apiMock.session as jest.Mock).mockRejectedValueOnce({ message: 'test' });

      renderWithStore(<Test />, { store });

      fireEvent.click(screen.getByRole('button', { name: 'session' }));

      expect(await screen.findByText('rejected')).toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent('Could not check user session');
    });
  });
});
