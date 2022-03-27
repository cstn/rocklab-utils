import { createSelector } from 'reselect';
import { RootState } from '../types';
import { hasBeenRead, isNew } from './domain/specifications';

const selectNotifications = (state: RootState) => state.notifications;

const selectNewNotifications = createSelector(selectNotifications, (notifications) =>
  notifications.filter((notification) => isNew(notification))
);

const selectNewNotificationsCount = createSelector(selectNewNotifications, (notifications) => notifications.length);

const selectReadNotifications = createSelector(selectNotifications, (notifications) =>
  notifications.filter((notification) => hasBeenRead(notification))
);

export { selectNotifications, selectNewNotifications, selectNewNotificationsCount, selectReadNotifications };
