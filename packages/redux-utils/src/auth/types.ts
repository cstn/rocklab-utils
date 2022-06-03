import { DefaultRootState } from 'react-redux';
import { User, UserProfile } from '@rocklab/react-utils';
import { SessionState } from './session/types';
import { RegisterState } from './register/types';
import { ConfirmState } from './confirmAccount/types';
import { ChangePasswordState } from './changePassword/types';
import { RequestPasswordState } from './requestPassword/types';
import { ResetPasswordState } from './resetPassword/types';

export type AuthState = {
  session: SessionState;
  register: RegisterState;
  confirm: ConfirmState;
  changePassword: ChangePasswordState;
  requestPassword: RequestPasswordState;
  resetPassword: ResetPasswordState;
};

export type RootState = DefaultRootState & {
  auth: AuthState;
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

export type Payload = Record<string, unknown>;

export type Response<T = Payload> = {
  status: number;
  statusText: string;
  data?: T;
};

export type AuthAPI = {
  login: (credentials: Credentials) => Promise<
    Response<{
      user: User;
      profile: UserProfile;
      access_token: string;
      refresh_token: string;
    }>
  >;
  logout: () => Promise<Response>;
  session: (token: string) => Promise<
    Response<{
      user: User;
      profile: UserProfile;
    }>
  >;
  register: (account: Account) => Promise<Response>;
  confirmAccount: (userId: string, token: string) => Promise<Response>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<Response>;
  requestPassword: (email: string) => Promise<Response>;
  resetPassword: (token: string, newPassword: string) => Promise<Response>;
};
