import { MessageDescriptor } from 'react-intl';
import { Notification, NotificationStatus } from '../models';
import { hasBeenRead, isMessageWithDescriptor, isSimpleMessage } from '../specifications';

const removeRead = (notifications: Notification[]): Notification[] =>
  notifications.filter((notification) => !hasBeenRead(notification));

const removeNotification = (notifications: Notification[], identifier: string) =>
  notifications.filter((notification) => {
    if (isSimpleMessage(notification) && notification.message === identifier) {
      return false;
    }

    return !(isMessageWithDescriptor(notification) && (notification.message as MessageDescriptor).id === identifier);
  });

const removeNotificationByIndex = (notifications: Notification[], index: number) =>
  notifications.filter((notification, notificationIndex) => notificationIndex !== index);

const reset = (notifications: Notification[]): Notification[] =>
  notifications.map((notification) => ({
    ...notification,
    status: NotificationStatus.New,
  }));

export { removeRead, removeNotification, removeNotificationByIndex, reset };
