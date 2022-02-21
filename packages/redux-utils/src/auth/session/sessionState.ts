import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../../status';

type SessionState = {
  status: Status;
  user?: User;
  profile?: UserProfile;
  token?: string;
  error: string | null;
};

const initialState: SessionState = {
  status: Status.Idle,
  error: null,
};

export { SessionState, initialState };
