import { Status } from '../../status';
import { AuthError } from '../utils/errors';

export type ResetPasswordState = {
  status: Status;
  email?: string;
  error?: AuthError;
};
