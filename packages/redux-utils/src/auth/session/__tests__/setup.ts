import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { AuthAPI } from '../../types';
import { sessionSlice } from '../index';

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

const { reducer, loginUser } = sessionSlice('session', apiMock);

const setup = (): Store =>
  configureStore({
    reducer: {
      auth: combineReducers({
        session: reducer,
      }),
    },
  });

export default setup;
export { apiMock, loginUser };
