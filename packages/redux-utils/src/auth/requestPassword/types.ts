import { Status } from '../../status';
import { AuthError } from '../types';

export type RequestPasswordState = {
  status: Status;
  email?: string;
  error: AuthError | null | undefined;
};

export type RequestPasswordPayload = { email: string };
