import { SessionState } from './types';
import { Status } from '../../status';

const initialState: SessionState = {
  status: Status.Idle,
  error: undefined,
};

export default initialState;
