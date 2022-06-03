import { PayloadAction } from '@reduxjs/toolkit';
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
  action: PayloadAction<{ type: NotificationType; message: Message; details?: Message }>
): NotificationsState => [
  ...state,
  createNotification(action.payload.type, action.payload.message, action.payload.details),
];

const addInfo = (
  state: NotificationsState,
  action: PayloadAction<{ message: Message; details?: Message }>
): NotificationsState => [...state, createInfo(action.payload.message, action.payload.details)];

const addSuccess = (
  state: NotificationsState,
  action: PayloadAction<{ message: Message; details?: Message }>
): NotificationsState => [...state, createSuccess(action.payload.message, action.payload.details)];

const addWarning = (
  state: NotificationsState,
  action: PayloadAction<{ message: Message; details?: Message }>
): NotificationsState => [...state, createWarning(action.payload.message, action.payload.details)];

const addError = (
  state: NotificationsState,
  action: PayloadAction<{ message: Message; details?: Message }>
): NotificationsState => [...state, createError(action.payload.message, action.payload.details)];

const read = (state: NotificationsState, action: PayloadAction<number>): NotificationsState => [
  ...state.map((notification, index) => (index === action.payload ? readNotification(notification) : notification)),
];

const remove = (state: NotificationsState, action: PayloadAction<number>): NotificationsState =>
  removeNotificationByIndex(state, action.payload);

const removeById = (state: NotificationsState, action: PayloadAction<string>): NotificationsState =>
  removeNotification(state, action.payload);

export { clear, addWarning, addMessage, addSuccess, addInfo, addError, remove, removeById, read };
