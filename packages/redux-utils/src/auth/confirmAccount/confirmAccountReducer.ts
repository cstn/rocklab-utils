import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './confirmAccontState';
import { Status } from '../../status';
import { ConfirmState } from './types';

const clear = () => initialState;

const confirmAccountRequest = (state: ConfirmState, action: PayloadAction<{ userId: string }>) => ({
  ...state,
  status: Status.Pending,
  userId: action.payload.userId,
});

const confirmAccountSuccess = (state: ConfirmState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const confirmAccountFailure = (state: ConfirmState, action: { payload: { message: string } | undefined }) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload?.message || 'Confirm account error',
});

export { clear, confirmAccountFailure, confirmAccountRequest, confirmAccountSuccess };
