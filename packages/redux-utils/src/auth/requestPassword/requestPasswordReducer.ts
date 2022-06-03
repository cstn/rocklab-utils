import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './requestPasswordState';
import { Status } from '../../status';
import { RequestPasswordState } from './types';
import { AuthError } from '../utils/errors';

const clear = () => initialState;

const requestPasswordRequest = (
  state: RequestPasswordState,
  action: Partial<PayloadAction<{ email: string }>>
): RequestPasswordState => ({
  ...state,
  status: Status.Pending,
  email: action.payload?.email,
});

const requestPasswordSuccess = (state: RequestPasswordState): RequestPasswordState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
});

const requestPasswordFailure = (
  state: RequestPasswordState,
  action: Partial<PayloadAction<AuthError>>
): RequestPasswordState => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, requestPasswordFailure, requestPasswordRequest, requestPasswordSuccess };
