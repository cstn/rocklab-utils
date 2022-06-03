import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../../status';
import { AuthError } from '../utils/errors';

export type SessionState = {
  status: Status;
  user?: User;
  profile?: UserProfile;
  accessToken?: string;
  refreshToken?: string;
  error?: AuthError;
};
