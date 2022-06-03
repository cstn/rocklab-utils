import { Notification } from './domain/models';

export type NotificationsState = Notification[];

export type RootState = {
  notifications: NotificationsState;
};
