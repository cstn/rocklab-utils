import { Status } from '../../status';
import { AuthError } from '../types';

export type ChangePasswordState = {
  status: Status;
  error: AuthError | null | undefined;
};
