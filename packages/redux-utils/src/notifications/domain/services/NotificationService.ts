import { Notification, NotificationStatus } from '../models';

const readNotification = (notification: Notification): Notification => ({
  ...notification,
  status: NotificationStatus.Read,
});

// eslint-disable-next-line import/prefer-default-export
export { readNotification };
