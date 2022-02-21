import { User, UserProfile } from '@rocklab/react-utils';
import { Status } from '../status';

export type Error = {
  message: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type Account = {
  email: string;
  username: string;
  password: string;
};

export type Response = {
  status: number;
  data?: Record<string, never>;
  error?: Error;
};

export type AuthAPI = {
  login: (credentials: Credentials) => Promise<Response>;
  logout: () => Promise<Response>;
  session: (token: string) => Promise<Response>;
  register: (account: Account) => Promise<Response>;
  confirmAccount: (userId: string, token: string) => Promise<Response>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<Response>;
  newPassword: (email: string) => Promise<Response>;
  resetPassword: (token: string, newPassword: string) => Promise<Response>;
};

export type SessionState = {
  status: Status;
  user?: User;
  profile?: UserProfile;
  token?: string;
  error: string | null;
};

export type AuthState = {
  session: SessionState;
};

export type RootState = {
  auth: AuthState;
};
