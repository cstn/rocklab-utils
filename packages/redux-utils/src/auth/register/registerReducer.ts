import initialState from './registerState';
import { Status } from '../../status';
import { RegisterState } from './types';

const clear = () => initialState;

const registerRequest = (state: RegisterState) => ({
  ...state,
  status: Status.Pending,
});

const registerSuccess = (state: RegisterState) => ({
  ...state,
  status: Status.Resolved,
  error: null,
});

const registerFailure = (state: RegisterState, action: { payload: { message: string } | undefined }) => ({
  ...state,
  status: Status.Rejected,
  error: action.payload?.message || 'Register error',
});

export { clear, registerFailure, registerRequest, registerSuccess };
