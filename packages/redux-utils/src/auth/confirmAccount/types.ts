import { Status } from '../../status';

export type ConfirmState = {
  status: Status;
  error: string | null;
};
