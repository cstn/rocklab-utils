import { Message, Notification, NotificationStatus, NotificationType } from '../models';

const createNotification = (type: NotificationType, message: Message, details?: Message): Notification => ({
  message,
  details,
  status: NotificationStatus.New,
  type,
  createdAt: new Date().toISOString(),
});

const createInfo = (message: Message, details?: Message): Notification =>
  createNotification(NotificationType.Info, message, details);

const createSuccess = (message: Message, details?: Message): Notification =>
  createNotification(NotificationType.Success, message, details);

const createWarning = (message: Message, details?: Message): Notification =>
  createNotification(NotificationType.Warning, message, details);

const createError = (message: Message, details?: Message): Notification =>
  createNotification(NotificationType.Error, message, details);

export { createNotification, createError, createInfo, createSuccess, createWarning };
