import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './resetPasswordState';
import { Status } from '../../status';
import { Error } from '../types';
import { ResetPasswordState } from './types';

const clear = () => initialState;

const resetPasswordRequest = (state: ResetPasswordState) => ({
  ...state,
  status: Status.Pending,
});

const resetPasswordSuccess = (state: ResetPasswordState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const resetPasswordFailure = (state: ResetPasswordState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload?.message || 'Reset password error',
});

export { clear, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess };
