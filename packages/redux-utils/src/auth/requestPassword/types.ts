import { Status } from '../../status';

export type RequestPasswordState = {
  status: Status;
  error: string | null;
  email?: string;
};

export type RequestPasswordPayload = { email: string };
