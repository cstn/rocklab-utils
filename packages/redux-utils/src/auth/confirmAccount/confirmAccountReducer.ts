import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './confirmAccontState';
import { Status } from '../../status';
import { Error } from '../types';
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

const confirmAccountFailure = (state: ConfirmState, action: Partial<PayloadAction<Error>>) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload?.message || 'Confirm account error',
});

export { clear, confirmAccountFailure, confirmAccountRequest, confirmAccountSuccess };
