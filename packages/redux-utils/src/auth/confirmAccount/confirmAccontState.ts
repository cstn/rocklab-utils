import { ConfirmState } from './types';
import { Status } from '../../status';

const initialState: ConfirmState = {
  status: Status.Idle,
  error: null,
  userId: undefined,
};

export default initialState;
