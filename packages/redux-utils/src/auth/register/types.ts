import { Status } from '../../status';

export type RegisterState = {
  status: Status;
  error: string | null;
  username?: string;
  email?: string;
};
