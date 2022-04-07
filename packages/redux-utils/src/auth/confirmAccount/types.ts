import { Status } from '../../status';
import { AuthError } from '../types';

export type ConfirmState = {
  status: Status;
  userId?: string;
  error: AuthError | null | undefined;
};

export type ConfirmPayload = { userId: string; token: string };
