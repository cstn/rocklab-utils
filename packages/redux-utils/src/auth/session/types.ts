import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../../status';

export type SessionState = {
  status: Status;
  user?: User;
  profile?: UserProfile;
  accessToken?: string;
  refreshToken?: string;
  error: string | null;
};

export type SessionPayload = {
  user?: User;
  profile?: UserProfile;
  access_token?: string;
  refresh_token?: string;
};
