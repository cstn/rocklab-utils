import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './changePasswordState';
import { Status } from '../../status';
import { ChangePasswordState } from './types';
import { AuthError } from '../utils/errors';

const clear = (): ChangePasswordState => initialState;

const changePasswordRequest = (state: ChangePasswordState): ChangePasswordState => ({
  ...state,
  status: Status.Pending,
});

const changePasswordSuccess = (state: ChangePasswordState): ChangePasswordState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
});

const changePasswordFailure = (
  state: ChangePasswordState,
  action: Partial<PayloadAction<AuthError>>
): ChangePasswordState => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, changePasswordFailure, changePasswordRequest, changePasswordSuccess };
