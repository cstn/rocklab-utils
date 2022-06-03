import { Status } from '../../status';
import { AuthError } from '../utils/errors';

export type RegisterState = {
  status: Status;
  username?: string;
  email?: string;
  error?: AuthError;
};
