import { ChangePasswordState } from './types';
import { Status } from '../../status';

const initialState: ChangePasswordState = {
  status: Status.Idle,
  error: undefined,
};

export default initialState;
