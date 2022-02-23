import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './requestPasswordState';
import { Status } from '../../status';
import { Error } from '../types';
import { RequestPasswordState } from './types';

const clear = () => initialState;

const requestPasswordRequest = (state: RequestPasswordState, action: Partial<PayloadAction<{ email: string }>>) => ({
  ...state,
  status: Status.Pending,
  email: action.payload?.email,
});

const requestPasswordSuccess = (state: RequestPasswordState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const requestPasswordFailure = (state: RequestPasswordState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload?.message || 'Request password error',
});

export { clear, requestPasswordFailure, requestPasswordRequest, requestPasswordSuccess };
