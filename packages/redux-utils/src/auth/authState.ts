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
