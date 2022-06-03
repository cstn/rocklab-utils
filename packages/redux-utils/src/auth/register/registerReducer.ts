import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './registerState';
import { Status } from '../../status';
import { RegisterState } from './types';
import { AuthError } from '../utils/errors';

const clear = () => initialState;

const registerRequest = (state: RegisterState): RegisterState => ({
  ...state,
  status: Status.Pending,
});

const registerSuccess = (state: RegisterState): RegisterState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
});

const registerFailure = (state: RegisterState, action: Partial<PayloadAction<AuthError>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, registerFailure, registerRequest, registerSuccess };
