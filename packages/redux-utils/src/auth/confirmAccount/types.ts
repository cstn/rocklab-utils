import { Status } from '../../status';
import { AuthError } from '../utils/errors';

export type ConfirmState = {
  status: Status;
  userId?: number;
  error?: AuthError;
};
