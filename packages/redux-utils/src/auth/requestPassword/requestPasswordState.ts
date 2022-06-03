import { RequestPasswordState } from './types';
import { Status } from '../../status';

const initialState: RequestPasswordState = {
  status: Status.Idle,
  email: undefined,
  error: undefined,
};

export default initialState;
