import { Status } from '../../status';

export type ConfirmState = {
  status: Status;
  error: string | null;
  userId?: string;
};

export type ConfirmPayload = { userId: string; token: string };
