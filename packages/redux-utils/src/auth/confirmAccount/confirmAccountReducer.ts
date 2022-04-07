import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './confirmAccontState';
import { Status } from '../../status';
import { AuthError } from '../types';
import { ConfirmPayload, ConfirmState } from './types';

const clear = () => initialState;

const confirmAccountRequest = (state: ConfirmState, action: Partial<PayloadAction<ConfirmPayload>>) => ({
  ...state,
  status: Status.Pending,
  userId: action.payload?.userId,
});

const confirmAccountSuccess = (state: ConfirmState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const confirmAccountFailure = (state: ConfirmState, action: Partial<PayloadAction<AuthError>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload,
});

export { clear, confirmAccountFailure, confirmAccountRequest, confirmAccountSuccess };
