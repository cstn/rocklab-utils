import { Status } from '../../status';
import { AuthError } from '../types';

export type ResetPasswordState = {
  status: Status;
  email?: string;
  error: AuthError | null | undefined;
};
