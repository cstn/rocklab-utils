import { PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';
import { ResetPasswordState } from './types';
import initialState from './resetPasswordState';

const clear = () => initialState;

const resetPasswordRequest = (state: ResetPasswordState): ResetPasswordState => ({
  ...state,
  status: Status.Pending,
});

const resetPasswordSuccess = (state: ResetPasswordState): ResetPasswordState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
});

const resetPasswordFailure = (
  state: ResetPasswordState,
  action: Partial<PayloadAction<AuthError>>
): ResetPasswordState => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess };
