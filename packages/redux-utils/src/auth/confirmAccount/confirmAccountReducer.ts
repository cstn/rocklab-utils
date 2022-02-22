import initialState from './confirmAccontState';
import { Status } from '../../status';
import { ConfirmState } from './types';

const clear = () => initialState;

const confirmAccountRequest = (state: ConfirmState) => ({
  ...state,
  status: Status.Pending,
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
