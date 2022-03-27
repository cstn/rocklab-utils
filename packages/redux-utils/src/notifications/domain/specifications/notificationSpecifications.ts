import { MessageDescriptor } from 'react-intl';
import { Notification, NotificationStatus, NotificationType } from '../models';

const isNotificationOfType = (notification: Notification, type: NotificationType): boolean =>
  notification.type === type;

const isInfo = (notification: Notification): boolean => isNotificationOfType(notification, NotificationType.Info);

const isSuccess = (notification: Notification): boolean => isNotificationOfType(notification, NotificationType.Success);

const isWarning = (notification: Notification): boolean => isNotificationOfType(notification, NotificationType.Warning);

const isError = (notification: Notification): boolean => isNotificationOfType(notification, NotificationType.Error);

const isNew = (notification: Notification): boolean => notification.status === NotificationStatus.New;

const hasBeenRead = (notification: Notification): boolean => notification.status === NotificationStatus.Read;

const isSimpleMessage = (notification: Notification): boolean => typeof notification.message === 'string';

const isMessageWithDescriptor = (notification: Notification): boolean =>
  Boolean((notification.message as MessageDescriptor).id);

export { isNew, hasBeenRead, isInfo, isError, isSuccess, isWarning, isSimpleMessage, isMessageWithDescriptor };
