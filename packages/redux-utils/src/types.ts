import { AuthState } from './auth/authState';
import { NotificationsState } from './notifications/types';

export type RootState = {
  auth: AuthState;
  notifications: NotificationsState;
};
