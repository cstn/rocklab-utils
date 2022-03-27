import { AuthState } from './auth/types';
import { NotificationsState } from './notifications/types';

export type RootState = {
  auth: AuthState;
  notifications: NotificationsState;
};
