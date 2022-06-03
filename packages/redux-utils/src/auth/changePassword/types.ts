import { Status } from '../../status';
import { AuthError } from '../utils/errors';

export type ChangePasswordState = {
  status: Status;
  error?: AuthError;
};
