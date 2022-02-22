import { RegisterState } from './types';
import { Status } from '../../status';

const initialState: RegisterState = {
  status: Status.Idle,
  error: null,
};

export default initialState;
