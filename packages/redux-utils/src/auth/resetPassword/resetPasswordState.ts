import { ResetPasswordState } from './types';
import { Status } from '../../status';

const initialState: ResetPasswordState = {
  status: Status.Idle,
  error: undefined,
  email: undefined,
};

export default initialState;
