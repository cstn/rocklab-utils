import { SessionState } from './session/types';
import { RegisterState } from './register/types';
import { ConfirmState } from './confirmAccount/types';
import { ChangePasswordState } from './changePassword/types';

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

export type AuthState = {
  session: SessionState;
  register: RegisterState;
  confirm: ConfirmState;
  changePassword: ChangePasswordState;
};
