import { ConfirmState } from './types';
import { Status } from '../../status';

const initialState: ConfirmState = {
  status: Status.Idle,
  error: null,
};

export default initialState;
