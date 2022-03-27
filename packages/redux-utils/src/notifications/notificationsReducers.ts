import initialState from './notificationsState';
import {
  createError,
  createInfo,
  createNotification,
  createSuccess,
  createWarning,
} from './domain/factories/NotificationFactory';
import { readNotification } from './domain/services/NotificationService';
import { removeNotificationByIndex, removeNotification } from './domain/services/NotificationsService';
import { NotificationsState } from './types';
import { Message, NotificationType } from './domain/models';

const clear = () => initialState;

const addMessage = (
  state: NotificationsState,
  { payload }: { payload: { type: NotificationType; message: Message; details?: Message } }
) => [...state, createNotification(payload.type, payload.message, payload.details)];

const addInfo = (state: NotificationsState, { payload }: { payload: { message: Message; details?: Message } }) => [
  ...state,
  createInfo(payload.message, payload.details),
];

const addSuccess = (state: NotificationsState, { payload }: { payload: { message: Message; details?: Message } }) => [
  ...state,
  createSuccess(payload.message, payload.details),
];

const addWarning = (state: NotificationsState, { payload }: { payload: { message: Message; details?: Message } }) => [
  ...state,
  createWarning(payload.message, payload.details),
];

const addError = (state: NotificationsState, { payload }: { payload: { message: Message; details?: Message } }) => [
  ...state,
  createError(payload.message, payload.details),
];

const read = (state: NotificationsState, { payload }: { payload: { index: number } }) => [
  ...state.map((notification, index) => (index === payload.index ? readNotification(notification) : notification)),
];

const remove = (state: NotificationsState, { payload }: { payload: { index?: number; identifier?: string } }) => {
  if (payload.identifier) {
    return removeNotification(state, payload.identifier);
  }

  if (payload.index) {
    return removeNotificationByIndex(state, payload.index);
  }

  return state;
};

export { clear, addWarning, addMessage, addSuccess, addInfo, addError, remove, read };
