import { Status } from '../../status';

export type ResetPasswordState = {
  status: Status;
  error: string | null;
  email?: string;
};
