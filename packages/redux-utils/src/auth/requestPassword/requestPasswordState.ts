import { RequestPasswordState } from './types';
import { Status } from '../../status';

const initialState: RequestPasswordState = {
  status: Status.Idle,
  error: null,
  email: undefined,
};

export default initialState;
