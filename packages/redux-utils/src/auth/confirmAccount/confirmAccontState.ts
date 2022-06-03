import { Status } from '../../status';
import { ConfirmState } from './types';

const initialState: ConfirmState = {
  status: Status.Idle,
  error: undefined,
  userId: undefined,
};

export default initialState;
