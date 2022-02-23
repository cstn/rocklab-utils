import { ResetPasswordState } from './types';
import { Status } from '../../status';

const initialState: ResetPasswordState = {
  status: Status.Idle,
  error: null,
  email: undefined,
};

export default initialState;
