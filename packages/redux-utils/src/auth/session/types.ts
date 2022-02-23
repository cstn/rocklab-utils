import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../../status';

export type SessionState = {
  status: Status;
  user?: User;
  profile?: UserProfile;
  token?: string;
  error: string | null;
};
