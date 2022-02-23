import { ChangePasswordState } from './types';
import { Status } from '../../status';

const initialState: ChangePasswordState = {
  status: Status.Idle,
  error: null,
};

export default initialState;
