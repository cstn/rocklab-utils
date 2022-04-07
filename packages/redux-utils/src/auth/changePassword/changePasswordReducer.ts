import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './changePasswordState';
import { Status } from '../../status';
import { AuthError } from '../types';
import { ChangePasswordState } from './types';

const clear = () => initialState;

const changePasswordRequest = (state: ChangePasswordState) => ({
  ...state,
  status: Status.Pending,
});

const changePasswordSuccess = (state: ChangePasswordState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const changePasswordFailure = (state: ChangePasswordState, action: Partial<PayloadAction<AuthError>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, changePasswordFailure, changePasswordRequest, changePasswordSuccess };
