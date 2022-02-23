import { RegisterState } from './types';
import { Status } from '../../status';

const initialState: RegisterState = {
  status: Status.Idle,
  error: null,
  username: undefined,
  email: undefined,
};

export default initialState;
