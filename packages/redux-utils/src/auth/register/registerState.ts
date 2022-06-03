import { RegisterState } from './types';
import { Status } from '../../status';

const initialState: RegisterState = {
  status: Status.Idle,
  username: undefined,
  email: undefined,
  error: undefined,
};

export default initialState;
