import { Status } from '../../status';
import { AuthError } from '../types';

export type RegisterState = {
  status: Status;
  username?: string;
  email?: string;
  error: AuthError | null | undefined;
};
