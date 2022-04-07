import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { AuthAPI } from '../../types';
import { changePasswordSlice } from '../index';

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

const { reducer, actions } = changePasswordSlice('changePassword', apiMock, {
  transformError: () => ({ message: 'Test error' }),
});

const setup = (): Store =>
  configureStore({
    reducer: {
      auth: combineReducers({
        changePassword: reducer,
      }),
    },
  });

export default setup;
export { apiMock, actions };
