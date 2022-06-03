import { Status } from '../../status';
import { AuthError } from '../utils/errors';

export type RequestPasswordState = {
  status: Status;
  email?: string;
  error?: AuthError;
};
