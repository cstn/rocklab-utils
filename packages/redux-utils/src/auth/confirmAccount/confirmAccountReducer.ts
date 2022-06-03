import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './confirmAccontState';
import { Status } from '../../status';
import { ConfirmState } from './types';
import { AuthError } from '../utils/errors';

const clear = () => initialState;

const confirmAccountRequest = (
  state: ConfirmState,
  action: Partial<PayloadAction<{ userId: number; token: string }>>
): ConfirmState => ({
  ...state,
  status: Status.Pending,
  userId: action.payload?.userId,
});

const confirmAccountSuccess = (state: ConfirmState): ConfirmState => ({
  ...state,
  status: Status.Resolved,
  error: undefined,
});

const confirmAccountFailure = (state: ConfirmState, action: Partial<PayloadAction<AuthError>>): ConfirmState => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, confirmAccountFailure, confirmAccountRequest, confirmAccountSuccess };
