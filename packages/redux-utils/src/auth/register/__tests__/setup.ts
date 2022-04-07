import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { AuthAPI } from '../../types';
import { registerSlice } from '../index';

const apiMock: AuthAPI = {
  login: jest.fn(),
  logout: jest.fn(),
  session: jest.fn(),
  confirmAccount: jest.fn(),
  changePassword: jest.fn(),
  register: jest.fn(),
  requestPassword: jest.fn(),
  resetPassword: jest.fn(),
};

const { reducer, actions } = registerSlice('register', apiMock, {
  transformError: () => ({ message: 'Test error' }),
});

const setup = (): Store =>
  configureStore({
    reducer: {
      auth: combineReducers({
        register: reducer,
      }),
    },
  });

export default setup;
export { apiMock, actions };
