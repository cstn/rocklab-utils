import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './registerState';
import { Status } from '../../status';
import { Error } from '../types';
import { RegisterState } from './types';

const clear = () => initialState;

const registerRequest = (state: RegisterState) => ({
  ...state,
  status: Status.Pending,
});

const registerSuccess = (state: RegisterState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const registerFailure = (state: RegisterState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload?.message || 'Register error',
});

export { clear, registerFailure, registerRequest, registerSuccess };
