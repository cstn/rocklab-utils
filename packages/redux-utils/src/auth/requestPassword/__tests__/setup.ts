import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { AuthAPI } from '../../types';
import { requestPasswordSlice } from '../index';

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

const { reducer, actions } = requestPasswordSlice('requestPassword', apiMock, {
  transformError: () => ({ message: 'Test error' }),
});

const setup = (): Store =>
  configureStore({
    reducer: {
      auth: combineReducers({
        requestPassword: reducer,
      }),
    },
  });

export default setup;
export { apiMock, actions };
